"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

interface Row {
  label: string;
  value: string;
}

interface SpecGroup {
  groupTitle: string;
  rows: Row[];
}

export function ProductSpecsTable({ specGroups }: { specGroups: SpecGroup[] }) {
  if (!specGroups || specGroups.length === 0) return null;

  return (
    <div className="space-y-8">
      {specGroups.map((group, i) => (
        <div key={i} className="dark">
          <h3 className="text-sm font-semibold text-[#111111] mb-4 uppercase tracking-wider border-b border-gray-200 pb-2">
            {group.groupTitle}
          </h3>
          <Table 
            aria-label={`${group.groupTitle} Specifications`} 
            removeWrapper 
            className="border border-[#27272a] rounded-2xl overflow-hidden bg-[#18181b]"
          >
            <TableHeader>
              <TableColumn className="bg-[#18181b] text-zinc-400 uppercase text-xs font-semibold tracking-widest py-4 border-b border-zinc-800 w-1/3">Feature</TableColumn>
              <TableColumn className="bg-[#18181b] text-zinc-400 uppercase text-xs font-semibold tracking-widest py-4 border-b border-zinc-800">Specification</TableColumn>
            </TableHeader>
            <TableBody items={group.rows || []} emptyContent="No specifications available.">
              {(row) => (
                <TableRow key={row.label} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                  <TableCell className="px-6 py-4 text-sm font-medium text-zinc-300 capitalize">{row.label}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-zinc-100 font-medium">{row.value}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
