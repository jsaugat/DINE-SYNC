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
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Trash2, Loader as LoaderLucide } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/slices/api/usersApiSlice.js";
import { setUsers } from "@/slices/usersSlice.js";
import { deleteUser } from "@/slices/usersSlice.js";

export default function ManageUsers({ contentWidth }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAdmin, _id: userId } = useSelector((state) => state.auth.userInfo);
  //! const { data: usersData, isLoading, error } = useGetUsersQuery(isAdmin);
  //!const [deleteUser, { data, isLoading: isDeleting, error }] = useDeleteUserMutation(userId);
  const usersData = useSelector((state) => state.users.usersData);
  const dispatch = useDispatch();
  const isLoading = false;
  const error = false;

  useEffect(() => {
    async function fetchAndSetUsers(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("ALL_USERS:: ", data);
        dispatch(setUsers(data));
      } catch (error) {
        // Handle errors here
        console.error("Error fetching or setting users:", error);
      }
    }

    fetchAndSetUsers(`http://localhost:6900/api/users?isAdmin=${isAdmin}`);
  }, [dispatch, isAdmin]);
  console.log("users ?? ", usersData);

  async function handleDeleteUser(userId) {
    try {
      setIsDeleting(true);
      const response = await fetch(
        `http://localhost:6900/api/users/${userId}?isAdmin=${isAdmin}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if required
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to delete user");
      }

      console.log("User deleted successfully");
      dispatch(deleteUser(userId));
      // Optionally, you can handle the response body here if needed:
      // const data = await response.json();
      // console.log('Response:', data);
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      console.error("Error deleting user:", error.message);
      // Handle errors here
    }
  }

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
        ) : !usersData ? (
          // JSON.stringify(usersData)
          <NoUsersMessage />
        ) : (
          usersData
            .filter((user) => user.isAdmin === false) // filter out admin users
            .map((user, idx) => (
              <UserCard
                key={idx}
                name={user.name}
                email={user.email}
                userId={user._id}
                registeredOn={user.createdAt}
                noOfReservations={user.reservations.length}
                handleDeleteUser={handleDeleteUser}
                isDeleting={isDeleting}
              />
            ))
        )}
      </main>
    </div>
  );
}

//? UserCard
const UserCard = ({
  name,
  email,
  userId,
  registeredOn,
  noOfReservations,
  handleDeleteUser,
  isDeleting,
}) => (
  <figure className="p-4 w-full rounded-lg bg-muted/40 border backdrop-blur-sm flex justify-between items-center">
    <section className="pr-4 flex flex-1 justify-between items-center">
      <div className="flex flex-col items-start">
        <span>{name}</span>
        <span className="text-googleBlue">{email}</span>
      </div>
    </section>
    <section className="flex-1 text-left">
      <div className="text-sm w-fit py-1 px-2 border rounded-full flex items-center gap-2">
        <div
          className={`size-2 rounded-full ${
            noOfReservations > 0 ? "bg-green-500" : "bg-neutral-500"
          }`}
        />
        <span
          className={`${
            noOfReservations <= 0 && "text-muted-foreground"
          }`}
        >
          {noOfReservations > 0 ? noOfReservations : "No"} current reservations
        </span>
      </div>
      <span className="text-muted-foreground text-xs">
        registered on{" "}
        {new Date(registeredOn).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    </section>
    <DeleteAlertDialog
      trigger={
        <Button variant="outline" className="flex items-center gap-2">
          <Trash2 className="size-4" strokeWidth={"1.5px"} />
          <span>Remove</span>
        </Button>
      }
      className="flex-1"
      userId={userId}
      handleDeleteUser={handleDeleteUser}
      isDeleting={isDeleting}
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
const DeleteAlertDialog = ({
  trigger,
  className,
  handleDeleteUser,
  isDeleting,
  userId,
}) => (
  <AlertDialog className={className}>
    <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm deletion of this user?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete this user and their orders from database.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => handleDeleteUser(userId)}
          className="text-red-500 bg-red-900/20 hover:bg-red-900/30"
        >
          {isDeleting && <LoaderLucide className="animate-spin" />}
          {!isDeleting && <span>Delete</span>}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
