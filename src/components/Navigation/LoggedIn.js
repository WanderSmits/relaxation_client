import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

export default function LoggedIn() {
  const dispatch = useDispatch();
  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem" }}></Nav.Item>
      <Button variant="light" onClick={() => dispatch(logOut())}>
        Logout
      </Button>
    </>
  );
}
