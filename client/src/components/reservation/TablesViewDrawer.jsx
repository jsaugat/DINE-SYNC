import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shadcn/ui/drawer";
import { Button } from "@/shadcn/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn/ui/tooltip";

const tablesColumnStyles = "flex flex-col w-[9rem] h-[18rem] justify-around";

export default function TablesViewDrawer({ onlyIcon, className }) {
  return (
    <Drawer className="dark">
      {/* <button className={`${onlyIcon === true ? " " : "" }`}> */}
      <DrawerTrigger>
        <Button
          variant="outline"
          className={`border w-full text-sm rounded-full  ${
            onlyIcon
              ? "fixed top-0 -right-16 z-50 aspect-square size-12"
              : "py-5"
          } ${className} `}
          size="sm"
        >
          {onlyIcon === true ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="size-full rounded-full flex gap-2 items-center justify-center">
                    <FitScreenIcon fontSize="small" />
                    {onlyIcon === true ? null : <span>View Tables Layout</span>}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Tables Layout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <FitScreenIcon fontSize="small" />
              {onlyIcon === true ? null : <span>View Tables Layout</span>}
            </div>
          )}
        </Button>
      </DrawerTrigger>
      {/* </button> */}
      <DrawerContent className="bg-black/50 backdrop-blur-sm">
        {/* Drawer Body */}
        <main className="relative mx-auto my-4 h-[55vh] w-[50vw] pb-12 border border-white/50 rounded-2xl flex justify-center items-center bg-black">
          {/* //? Tables of 4 */}
          <section className={`${tablesColumnStyles}`}>
            {[1, 2, 3].map((tableId) => (
              <div key={tableId} className="flex flex-col items-center">
                {/* seats */}
                <div className="flex justify-center gap-3">
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-tl-full rounded-tr-full" />
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-tl-full rounded-tr-full" />
                </div>
                {/* the table */}
                <Table className="h-[3rem] w-[5rem] rounded-md">
                  <TableId tableId={tableId} />
                </Table>
                {/* seats */}
                <div className="flex justify-center gap-3">
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-bl-full rounded-br-full" />
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-bl-full rounded-br-full" />
                </div>
              </div>
            ))}
          </section>
          {/* Tables of 2 */}
          <section className={`${tablesColumnStyles}`}>
            {[4, 5, 6, 7].map((tableId) => (
              <div
                key={tableId}
                className="flex items-center justify-center gap-1"
              >
                {/* seats */}
                <div className="flex justify-center gap-3">
                  <Seat className="w-[.6rem] h-[1.5rem] rounded-tl-full rounded-bl-full" />
                </div>
                {/* the table */}
                <Table className="size-[3.23rem] rounded-xl">
                  <TableId tableId={tableId} />
                </Table>
                {/* seats */}
                <div className="flex justify-center gap-3">
                  <Seat className="w-[.6rem] h-[1.5rem] rounded-tr-full rounded-br-full" />
                </div>
              </div>
            ))}
          </section>
          <section className={`${tablesColumnStyles}`}>
            {[8, 9].map((tableId) => (
              <div
                key={tableId}
                className="flex items-center justify-center gap-1"
              >
                {/* seats */}
                <div className="flex flex-col items-center gap-2">
                  <Seat className="w-[.6rem] h-[1.5rem] rounded-tl-full rounded-bl-full" />
                  <Seat className="w-[.6rem] h-[1.5rem] rounded-tl-full rounded-bl-full" />
                  <Seat className="w-[.6rem] h-[1.5rem] rounded-tl-full rounded-bl-full" />
                </div>
                {/* the table */}
                <Table className="h-[7rem] w-[3.3rem] rounded-md">
                  <TableId tableId={tableId} />
                </Table>
                {/* seats */}
                <div className="flex flex-col items-center gap-2">
                  <Seat className="w-[.6rem] h-[1.5rem] rounded-tr-full rounded-br-full" />
                  <Seat className="w-[.6rem] h-[1.5rem] rounded-tr-full rounded-br-full" />
                  <Seat className="w-[.6rem] h-[1.5rem] rounded-tr-full rounded-br-full" />
                </div>
              </div>
            ))}
          </section>
          <section className="flex flex-col w-[13rem] h-[18rem] justify-around">
            {[10, 11, 12].map((tableId) => (
              <div key={tableId} className="flex flex-col items-center">
                {/* seats */}
                <div className="flex justify-center gap-3">
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-tl-full rounded-tr-full" />
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-tl-full rounded-tr-full" />
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-tl-full rounded-tr-full" />
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-tl-full rounded-tr-full" />
                </div>
                {/* the table */}
                <Table className="h-[3rem] w-[10rem] rounded-md">
                  <TableId tableId={tableId} />
                </Table>
                {/* seats */}
                <div className="flex justify-center gap-3">
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-bl-full rounded-br-full" />
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-bl-full rounded-br-full" />
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-bl-full rounded-br-full" />
                  <Seat className="h-[.6rem] w-[1.5rem] rounded-bl-full rounded-br-full" />
                </div>
              </div>
            ))}
          </section>
          <span className="absolute bottom-2 text-googleBlue">Entrance</span>
          <div className="absolute bottom-0 w-[4rem] h-[.3rem] bg-onyx"></div>
        </main>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" className="rounded-full">
              <Cross1Icon className="mr-2 h-4 w-4" /> Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
// Components
// Seat
function Seat({ className }) {
  return <div className={`bg-[#232323] border-2 ${className}`}></div>;
}
function Table({ children, className }) {
  return (
    <div
      className={`bg-[#232323] border border-neutral-400 px-3 my-1 flex justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
}
function TableId({ tableId }) {
  return (
    <div className="rounded-full flex justify-center items-center">
      <span className="text-googleBlue text-[.9rem] font-medium">
        T-{tableId}
      </span>
    </div>
  );
}
