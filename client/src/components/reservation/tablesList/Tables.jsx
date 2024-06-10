import { useSelector, useDispatch } from "react-redux";
import { setTable } from "@/slices/reservation/selectionSlice";
import { setSize } from "@/slices/reservation/selectionSlice";
import { setTotalTables } from "@/slices/reservation/totalTablesSlice";
import { useEffect, useState } from "react";
// styles
import styles from "./style.module.scss";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { TablesViewDrawer } from "@/master";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useToast } from "@/shadcn/ui/use-toast";
import { CircleAlert, MoveLeft, CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Indicator from "@/components/Indicator";

export default function Tables({ search, getFormattedDateTime }) {
  // selected details
  let {
    date: selectedDate,
    time: selectedTime,
    size: selectedSize,
    table: { number: selectedTableNumber },
  } = useSelector((state) => state.selection);
  const totalTables = useSelector((state) => state.totalTables);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    /**
     * @function fetchTableAvailability
     * @desc Fetch tables availability from the server using formattedDateTime (date, time) and size picked by the user.
     */
    const fetchTableAvailability = async () => {
      // if date or time is not selected
      if (!selectedDate || !selectedTime) return;
      const selectedDateTime = getFormattedDateTime();

      try {
        const response = await fetch("http://localhost:6900/api/tables", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: selectedDateTime,
          }),
        });
        // in response we get first doc from Day collection whose structure is { date: ..., tables : [tableSchema]}, tables is an array. now,
        if (response.ok) {
          console.log("Tables fetched successfully");
          const { tables } = await response.json();
          console.log("Tables: ", tables);
          // Filter available tables with party size criteria.
          // if size is not selected, return all tables
          const filteredTables = !selectedSize
            ? tables
            : tables.filter((table) => table.capacity == selectedSize);
          dispatch(setTotalTables(filteredTables));

          //? Check if all tables are reserved
          const allTablesReserved = filteredTables.every(
            (table) => table.status === "reserved"
          );
          //! If all tables are reserved
          if (allTablesReserved) {
            toast({
              variant: "destructive",
              title: "All tables are reserved for this date, time and size.",
              description: "Please choose another day or time.",
            });
          }
        } else {
          console.log(
            "Error fetching tables from the endpoint: " + response.statusText
          );
        }
      } catch (err) {
        console.log("Error fetching tables availability: " + err);
      }
    };
    fetchTableAvailability();
  }, [selectedDate, selectedTime, getFormattedDateTime]);

  return (
    /**
     * go to @/shadcn/table.jsx to style the table, for e.g. TableCell > <td className="w-1/5"></td>
     */
    <main className="dark:bg-black/20 backdrop-blur-md rounded-3xl p-4 border border-onyx w-[24rem] table-auto shadow-2xl shadow-black">
      <Table>
        <TableCaption>
          A list of available tables based on your selection.
        </TableCaption>
        <ScrollArea className="w-full h-[19.2rem]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Table ID</TableHead>
              <TableHead className="text-center">Capacity</TableHead>
            </TableRow>
          </TableHeader>
          {/* //? Table Details Body */}
          <TableBody className="relative">
            {totalTables.length ? (
              totalTables.map((table) => (
                <TableRow
                  key={table.number}
                  className={`cursor-pointer ${table.isAvailable ? "" : "text-neutral-500 hover:bg-black"
                    }`}
                  onClick={() => {
                    if (!table.isAvailable) {
                      toast({
                        variant: "destructive",
                        title: "Please select an available table!!",
                      });
                      return;
                    }
                    dispatch(setTable(table.number));
                    dispatch(setSize(table.capacity));
                  }}
                >
                  {/* Table Status Cell */}
                  <TableCell className="text-center">
                    <Indicator status="available" />
                  </TableCell>
                  {/* Table Number Cell */}
                  <TableCell className="font-medium text-center">
                    <span>T-{table.number}</span>
                  </TableCell>
                  {/* Capacity Cell */}
                  <TableCell className="text-center">
                    {table.capacity}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <NotSelectedWarning />
            )}
          </TableBody>
        </ScrollArea>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-white bg-transparent py-3">
              {totalTables.length ? (
                selectedTableNumber ? (
                  <div className="flex gap-2 justify-center items-center">
                    <CheckCheck className="text-white size-5" />
                    <span>
                      <span className="text-green-500 text-xl">
                        T-{selectedTableNumber}
                      </span>{" "}
                      Table is selected.
                    </span>
                  </div>
                ) : (
                  <span>Please Select a Table</span>
                )
              ) : (
                <span className="text-googleBlue flex items-center justify-center gap-2">
                  <MoveLeft className="size-5" /> Select filters to reveal
                  tables.
                </span>
              )}
            </TableCell>
            {/* <TableCell className="text-right">$2,500.00</TableCell> */}
          </TableRow>
        </TableFooter>
      </Table>
      {/* Table Viewer Drawer */}
      <TablesViewDrawer onlyIcon={true} />
    </main>
  );
}

const NotSelectedWarning = () => (
  <section className="absolute border rounded-lg p-4 text-muted-foreground bg-muted/30 w-full top-2 flex items-center justify-center">
    <div className="flex items-center gap-2">
      <CircleAlert
        strokeWidth={"1.5px"}
        className="text-muted-foreground size-4"
      />{" "}
      <div>Please pick a date and time.</div>
    </div>
  </section>
);
