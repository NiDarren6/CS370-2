import { useState, useEffect, useMemo } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiSearchLine,
} from "@remixicon/react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextInput,
} from "@tremor/react";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

interface Company {
  name: string;
  industries: string;
  valuation: number;
  growthStage: string;
  totalFunding: number;
  lastFundingRound: string;
  launchYear: number;
}

function getMedianValue(value) {
  if (value && value.includes("-")) {
    const parts = value.split("-").map((part) => parseFloat(part.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return (parts[0] + parts[1]) / 2;
    }
  }
  return parseFloat(value);
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      //const cachedData = localStorage.getItem("companies");
      //if (cachedData) {
      //  setCompanies(JSON.parse(cachedData));
      //} else {
      try {
        const response = await fetch("/api/company_page");
        if (!response.ok) {
          console.error(
            "Failed to fetch companies: Network response was not ok"
          );
          return;
        }
        const data = await response.json();
        setCompanies(data);
        localStorage.setItem("companies", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
      //}
    };

    fetchData();
  }, []);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const filteredCompanies = useMemo(
    () =>
      companies.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [companies, searchTerm]
  );

  const companiesColumns: ColumnDef<Company, unknown>[] = [
    {
      header: "Company Name",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      header: "Industry",
      accessorKey: "industries",
      enableSorting: true,
    },
    {
      header: "Total Funding",
      accessorKey: "amount",
      enableSorting: true,
      cell: ({ getValue }) => {
        const value = getValue();
        const medianValue = getMedianValue(value);
        if (!isNaN(medianValue)) {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(medianValue);
        }
        return "N/A";
      },
    },
    {
      header: "Last Funding Round",
      accessorKey: "round",
      enableSorting: false,
    },
    {
      header: "Valuation",
      accessorKey: "round_valuation_usd",
      enableSorting: true,
      cell: ({ getValue }) => {
        const value = getValue();
        const medianValue = getMedianValue(value);
        if (!isNaN(medianValue)) {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(medianValue);
        }
        return "N/A";
      },
    },
    {
      header: "Growth Stage",
      accessorKey: "growth_stage",
      enableSorting: false,
    },
    {
      header: "Launch Year",
      accessorKey: "launch_year",
      enableSorting: true,
    },
  ];

  const table = useReactTable<Company>({
    data: filteredCompanies,
    columns: companiesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: "valuation", desc: true }],
    },
  });

  return (
    <>
      <div className="mb-8 flex justify-center w-full">
        <h1 className="text-3xl font-bold text-cyan-200">
          Comprehensive List of Startups
        </h1>
      </div>
      <div>
        <TextInput
          icon={RiSearchLine}
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const toggleSortingHandler =
                  header.column.getToggleSortingHandler();

                return (
                  <TableHeaderCell
                    key={header.id}
                    onClick={(event) =>
                      toggleSortingHandler && toggleSortingHandler(event)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && toggleSortingHandler) {
                        toggleSortingHandler(event);
                      }
                    }}
                    className={classNames(
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      "px-0.5 py-1.5 text-cyan-200"
                    )}
                    tabIndex={header.column.getCanSort() ? 0 : -1}
                    aria-sort={
                      header.column.getIsSorted()
                        ? header.column.getIsSorted() === "asc"
                          ? "ascending"
                          : header.column.getIsSorted() === "desc"
                          ? "descending"
                          : "none"
                        : "none"
                    }
                  >
                    <div className="flex items-center justify-between gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <div className="-space-y-2">
                          <RiArrowUpSLine
                            className={
                              header.column.getIsSorted() === "desc"
                                ? "opacity-30"
                                : ""
                            }
                            aria-hidden={true}
                          />
                          <RiArrowDownSLine
                            className={
                              header.column.getIsSorted() === "asc"
                                ? "opacity-30"
                                : ""
                            }
                            aria-hidden={true}
                          />
                        </div>
                      )}
                    </div>
                  </TableHeaderCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-cyan-200">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
