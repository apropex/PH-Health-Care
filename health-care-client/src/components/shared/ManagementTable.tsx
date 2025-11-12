/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import joinText from "@/utility/joinText";
import { CopyIcon, EditIcon, EllipsisVertical, EyeIcon, Trash2Icon } from "lucide-react";

export interface iTableColumns<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface iManagementTable<T> {
  data: T[];
  columns: iTableColumns<T>[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  rowKey: (row: T) => string;
  isRefresh: boolean;
  emptyMessage?: string;
}

export default function ManagementTable<T>(props: iManagementTable<T>) {
  const { data, columns, onView, onEdit, onDelete, rowKey, emptyMessage } = props;

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            {(columns || []).map((col, i) => (
              <TableHead
                key={joinText("management-table-head-", i)}
                className={col.className}
              >
                {col.header}
              </TableHead>
            ))}
            {(data || []).length && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!(data || []).length ? (
            <TableRow>
              <TableCell
                colSpan={(columns || []).length}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage || "No data found"}
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data.map((item) => (
                <TableRow key={rowKey(item)}>
                  {columns.map((col, i) => (
                    <TableCell key={i} className={col.className}>
                      {typeof col.accessor === "function"
                        ? col.accessor(item)
                        : String(item[col.accessor])}
                    </TableCell>
                  ))}

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <EllipsisVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>actions</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText((item as any).id)
                            }
                          >
                            <CopyIcon />
                            Copy Id
                          </DropdownMenuItem>
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(item)}>
                              <EyeIcon />
                              View
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                              <EditIcon />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem onClick={() => onDelete(item)}>
                              <Trash2Icon />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
