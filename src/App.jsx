import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import MobileSearchPage from "./pages/MobileSearchPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import CastInfo from "./pages/CastInfo";
import ViewMoreMoviePage from "./pages/ViewMoreMoviePage";
import ViewAllSearchResultPage from "./pages/ViewAllSearchResultPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./features/ProtectedRoute";
import FavoriteMoviePage from "./pages/FavoriteMoviePage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/view-more/:title" element={<ViewMoreMoviePage />} />
        <Route path="/mobile-search-page" element={<MobileSearchPage />} />{" "}
        <Route path="/movieInfo/:id" element={<MovieInfoPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/favorite-movie" element={<FavoriteMoviePage />} />
        </Route>
        <Route path="/castInfo/:id" element={<CastInfo />} />
        <Route
          path="/all-result/:keyword"
          element={<ViewAllSearchResultPage />}
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
