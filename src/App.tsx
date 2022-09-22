import React, { useRef } from "react";
import { CssBaseline, Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { styled } from "@mui/material";

import {
  Actors,
  MovieInformation,
  Movies,
  Navbar,
  Profile,
} from "./components";
import useAlan from "./useAlan";

const ContentBox = styled(Box)({
  flexGrow: 1,
  padding: "2em",
  width: "100%",
});

const RootBox = styled(Box)({
  display: "flex",
  height: "100%",
});

const ToolBarBox = styled(Box)({
  height: "70px",
});

function App() {
  const { btnInstance } = useAlan();

  return (
    <>
      <CssBaseline />
      <RootBox>
        <Navbar />
        <ContentBox component="main">
          <ToolBarBox />
          <Routes>
            <Route path="/movie/:id" element={<MovieInformation />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/approved" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Movies />} />
          </Routes>
        </ContentBox>
      </RootBox>
    </>
  );
}

export default App;
