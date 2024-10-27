import DictionaryPage from "@/features/dictionary/DictionaryPage";
import FlashCardSetsPage from "@/features/flash-card/FlashCardSetsPage";
import LearnFlashCardPage from "@/features/flash-card/LearnFlashCardPage";
import GrammarCheckPage from "@/features/grammar-check/GrammarCheckPage";
import LearnThroughImagesPage from "@/features/learn-through-images/LearnThroughImagesPage";
import SpellCheckPage from "@/features/spell-check/SpellCheckPage";
import LoginPage from "@/features/user/LoginPage";
import RegisterPage from "@/features/user/RegisterPage";
import Layout from "@/layout/Layout";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/dictionary" />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/dictionary",
          element: <DictionaryPage />,
        },
        {
          path: "/learn-through-images",
          element: <LearnThroughImagesPage />,
        },
        {
          path: "/learn-flashcard",
          element: <FlashCardSetsPage />,
        },
        {
          path: "/learn-flashcard/:ListId",
          element: <LearnFlashCardPage />,
        },
        {
          path: "/check-spelling",
          element: <SpellCheckPage />,
        },
        {
          path: "check-grammar",
          element: <GrammarCheckPage />,
        },
      ],
    },
  ],
  {
    basename: "/enghub",
  },
);

export default router;
