import { Container } from "@/master";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import React, { useEffect } from "react";
import { CircleAlert } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useGetUsersQuery } from "@/slices/api/usersApiSlice.js";
import { setUsers } from "@/slices/usersSlice.js";

export default function ManageUsers({ contentWidth }) {
  const { isAdmin } = useSelector((state) => state.auth.userInfo);
  const { data: users, isLoading, error } = useGetUsersQuery(isAdmin);
  const usersState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  // const isLoading = false;
  // const error = false;

  useEffect(() => {
    console.log("users ?? ", users);
  }, []);

  // useEffect(() => {
  //   if (users) {
  //     dispatch(setUsers(users));
  //   }
  // }, [dispatch, users]);

  return (
    <div className={contentWidth}>
      <main className="min-h-[40rem] h-full flex flex-col items-start gap-3 text-[0.9rem]">
        <h3 className="text-3xl my-6 mb-4 text-white text-left">
          Manage Users
        </h3>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : usersState ? (
          usersState.map((user, idx) => <UserCard key={idx} />)
        ) : (
          <NoUsersMessage />
        )}
      </main>
      Users
    </div>
  );
}

//? UserCard
const UserCard = () => (
  <figure className="p-4 w-full rounded-lg bg-muted/50 border flex justify-between items-center">
    <section className="pr-4 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <span>Saugat Joshi</span>
        <span className="text-googleBlue">jsaugatt02@gmail.com</span>
      </div>
    </section>
    <section>
      <span className="text-sm flex items-center gap-2">
        <div className="size-2 rounded-full bg-green-500" /> 2 current
        reservations
      </span>
      <span className="text-muted-foreground text-xs">
        registered on May 12, 2024
      </span>
    </section>
    <DeleteAlertDialog
      trigger={
        <Button variant="outline" className="flex items-center gap-2">
          <Trash2 className="size-4" strokeWidth={"1.5px"} />
          <span>Remove</span>
        </Button>
      }
    />
  </figure>
);

//? Loader
const Loader = () => (
  <div className="flex items-center gap-2 opacity-60">
    <Loader className="animate-spin size-5" />
    Fetching Users
  </div>
);

//? NoUsersMessage
const NoUsersMessage = () => (
  <section className="border rounded-lg p-12 text-muted-foreground bg-muted/50 backdrop-blur-[1px] w-full flex flex-col items-center justify-center">
    <div className="flex items-center gap-2 justify-center">
      <CircleAlert
        strokeWidth={"1.5px"}
        className="text-muted-foreground size-5"
      />{" "}
      <div>Zero users right now</div>
    </div>
  </section>
);

//! Delete alert dialog
const DeleteAlertDialog = ({ trigger }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete this user and their reservation details
          from database.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="text-red-500 bg-red-900/20 hover:bg-red-900/30">
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
