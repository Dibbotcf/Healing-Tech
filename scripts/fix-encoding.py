"""
Fix double-CP437-encoded Mojibake in Directus product text fields.

The corruption happened when Unicode characters (curly quotes, dashes, etc.)
had their UTF-8 bytes decoded as CP437, the resulting chars re-encoded as
UTF-8, and THOSE bytes decoded as CP437 again — a double transformation.

Reversal: encode corrupted chars as CP437, decode as UTF-8, encode as CP437,
decode as UTF-8. This recovers the original character.
"""

import urllib.request, urllib.error, json, sys, ssl
# bypass SSL verification on Windows where certs may be missing
SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE

DIRECTUS_URL = "https://cms.healingtechnology.com.bd"
DIRECTUS_TOKEN = "ht-migrate-token-sgut6bo2qxe"

def try_fix_segment(chars):
    try:
        as_cp437 = chars.encode("cp437")
        intermediate = as_cp437.decode("utf-8")
        as_cp437_2 = intermediate.encode("cp437")
        original = as_cp437_2.decode("utf-8")
        if len(original) < len(chars) and all(c.isprintable() or c in "\n\r\t" for c in original):
            return original
    except Exception:
        pass
    return None

def fix_text(text):
    if not isinstance(text, str) or not text:
        return text
    result = []
    i = 0
    while i < len(text):
        fixed = False
        for window in [6, 4, 3]:
            if i + window <= len(text):
                fixed_seg = try_fix_segment(text[i:i+window])
                if fixed_seg:
                    result.append(fixed_seg)
                    i += window
                    fixed = True
                    break
        if not fixed:
            result.append(text[i])
            i += 1
    return "".join(result)

def fix_value(val):
    if isinstance(val, str):
        return fix_text(val)
    if isinstance(val, list):
        return [fix_value(item) for item in val]
    if isinstance(val, dict):
        return {k: fix_value(v) for k, v in val.items()}
    return val

def directus_get(path):
    req = urllib.request.Request(
        f"{DIRECTUS_URL}{path}",
        headers={
            "Authorization": f"Bearer {DIRECTUS_TOKEN}",
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json",
        }
    )
    with urllib.request.urlopen(req, context=SSL_CTX) as r:
        return json.loads(r.read().decode("utf-8"))

def directus_patch(path, body):
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        f"{DIRECTUS_URL}{path}",
        data=data,
        method="PATCH",
        headers={
            "Authorization": f"Bearer {DIRECTUS_TOKEN}",
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json",
        }
    )
    with urllib.request.urlopen(req, context=SSL_CTX) as r:
        return json.loads(r.read().decode("utf-8"))

TEXT_FIELDS = [
    "listing_summary", "short_summary", "sku",
    "key_highlights", "applications", "spec_groups",
    "download_items", "support_blocks", "faq_items",
    "certification_summary", "brochure_page_ref",
]

def run():
    # Get all product IDs
    res = directus_get("/items/products?fields=id&limit=200")
    ids = [item["id"] for item in res["data"]]
    sys.stdout.buffer.write(f"Found {len(ids)} products\n".encode("utf-8"))

    total_fixed = 0
    for pid in ids:
        fields_param = ",".join(TEXT_FIELDS)
        product = directus_get(f"/items/products/{pid}?fields={fields_param}")["data"]

        patch = {}
        for field in TEXT_FIELDS:
            original = product.get(field)
            if original is None:
                continue
            fixed = fix_value(original)
            if fixed != original:
                patch[field] = fixed
                orig_repr = json.dumps(original, ensure_ascii=False)[:80]
                fixed_repr = json.dumps(fixed, ensure_ascii=False)[:80]
                sys.stdout.buffer.write(f"  Product {pid} [{field}]:\n    BEFORE: {orig_repr}\n    AFTER:  {fixed_repr}\n".encode("utf-8"))

        if patch:
            directus_patch(f"/items/products/{pid}", patch)
            total_fixed += 1
            sys.stdout.buffer.write(f"  -> Patched product {pid}\n".encode("utf-8"))
        else:
            sys.stdout.buffer.write(f"  Product {pid}: no changes needed\n".encode("utf-8"))

    sys.stdout.buffer.write(f"\nDone. Fixed {total_fixed} products.\n".encode("utf-8"))

if __name__ == "__main__":
    run()
