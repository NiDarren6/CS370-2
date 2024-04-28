import { useState, useEffect, useMemo } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
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
  width: number;
}

const Button = ({ onClick, disabled, children }) => {
  return (
    <button
      type="button"
      className="px-2 py-2 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

function capitalizeWords(str) {
  return str
    .replace(/;/g, ", ")
    .split(", ")
    .map((segment) =>
      segment
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .join(", ");
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
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [industrySearchTerm, setIndustrySearchTerm] = useState("");
  const [pageIndex] = useState(0);
  const [pageSize] = useState(20);

  const handleCompanySearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    setCompanySearchTerm(event.target.value);
  };

  const handleIndustrySearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    setIndustrySearchTerm(event.target.value);
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(companySearchTerm.toLowerCase()) &&
        company.industries
          .toLowerCase()
          .includes(industrySearchTerm.toLowerCase())
    );
  }, [companies, companySearchTerm, industrySearchTerm]);

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
        // localStorage.setItem("companies", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
      //}
    };

    fetchData();
  }, []);

  const companiesColumns: ColumnDef<Company, unknown>[] = [
    {
      header: "Company Name",
      accessorKey: "name",
      enableSorting: true,
      cell: ({ getValue }) => {
        const text = getValue();
        return capitalizeWords(text);
      },
    },
    {
      header: "Industry",
      accessorKey: "industries",
      enableSorting: true,
      cell: ({ getValue }) => {
        const text = getValue();
        return capitalizeWords(text);
      },
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
      cell: ({ getValue }) => {
        const text = getValue();
        return capitalizeWords(text);
      },
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
      cell: ({ getValue }) => {
        const text = getValue();
        return capitalizeWords(text);
      },
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
    initialState: {
      sorting: [{ id: "round_valuation_usd", desc: true }],
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="mb-8 flex justify-center w-full">
        <h1 className="text-3xl font-bold text-cyan-200">
          Comprehensive List of Tech Companies from Atlanta
        </h1>
      </div>

      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const hasSearch =
                  header.id === "name" || header.id === "industries";
                return (
                  <TableHeaderCell
                    key={header.id}
                    className={classNames(
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      "px-0.5 py-1.5 text-cyan-200",
                      !hasSearch ? "raise-header" : ""
                    )}
                    tabIndex={header.column.getCanSort() ? 0 : -1}
                  >
                    <div className="flex flex-col items-center w-full">
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex justify-between items-center w-full cursor-pointer"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <div className="flex items-center -space-y-2">
                            <RiArrowUpSLine
                              className={
                                header.column.getIsSorted() === "desc"
                                  ? "opacity-30"
                                  : ""
                              }
                              aria-hidden="true"
                            />
                            <RiArrowDownSLine
                              className={
                                header.column.getIsSorted() === "asc"
                                  ? "opacity-30"
                                  : ""
                              }
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
                      {hasSearch ? (
                        <input
                          type="text"
                          placeholder={`Search ${header.column.columnDef.header}...`}
                          value={
                            header.id === "name"
                              ? companySearchTerm
                              : industrySearchTerm
                          }
                          onChange={
                            header.id === "name"
                              ? handleCompanySearchChange
                              : handleIndustrySearchChange
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2 p-1 text-sm w-full"
                        />
                      ) : (
                        <div style={{ height: "38px" }} />
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
      <div className="mt-10 flex items-center justify-between">
        <p className="text-tremor-default tabular-nums text-tremor-content dark:text-dark-tremor-content">
          Page{" "}
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">{`${
            table.getState().pagination.pageIndex + 1
          }`}</span>{" "}
          of
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {" "}
            {`${table.getPageCount()}`}
          </span>
        </p>
        <div className="inline-flex items-center rounded-tremor-full shadow-tremor-input ring-1 ring-inset ring-tremor-ring dark:shadow-dark-tremor-input dark:ring-dark-tremor-ring">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Previous</span>
            <RiArrowLeftSLine
              className="h-5 w-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
              aria-hidden={true}
            />
          </Button>
          <span
            className="h-5 border-r border-tremor-border dark:border-dark-tremor-border"
            aria-hidden={true}
          />
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Next</span>
            <RiArrowRightSLine
              className="h-5 w-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
              aria-hidden={true}
            />
          </Button>
        </div>
      </div>
    </>
  );
}
