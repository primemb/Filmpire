import alanBtn from "@alan-ai/alan-sdk-web";
import { useContext, useEffect, useRef } from "react";
import { ICommands } from "./types/Commands";
import { ColorModeContext } from "./utils/ToggleColorMode";
import { AlanButton } from "@alan-ai/alan-sdk-web/dist/AlanButton";
import { fetchToken } from "./utils";
import { useAppDispatch } from "./app/hooks";
import { logout } from "./features/auth";
import { useNavigate } from "react-router-dom";
import {
  searchMovie,
  selectGenreOrCategory,
} from "./features/currentGenreOrCategory";
const useAlan = () => {
  const colorCtx = useContext(ColorModeContext);
  const alanButtonRef = useRef<{ btnInstance?: AlanButton }>({}).current;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    alanButtonRef.btnInstance = alanBtn({
      key: "f1fbd1e123a545ecaa511acb2ec878ed2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        const CommandDataType = commandData as ICommands;
        if (CommandDataType.command === "chooseGenre") {
          const { genres, genreOrCategory } = CommandDataType;

          const foundGenre = genres?.find(
            (g) =>
              g.name.toLocaleLowerCase() === genreOrCategory.toLocaleLowerCase()
          );

          if (foundGenre) {
            navigate(`/`);
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const parsedGenre = (genreOrCategory as string).startsWith("top")
              ? "top_rated"
              : genreOrCategory;

            navigate(`/`);
            dispatch(selectGenreOrCategory(parsedGenre));
          }
        } else if (CommandDataType.command === "changeMode") {
          const mode = CommandDataType.mode;
          if (mode === "light") {
            colorCtx.setMode("light");
          } else {
            colorCtx.setMode("dark");
          }
        } else if (CommandDataType.command === "login") {
          fetchToken();
        } else if (CommandDataType.command === "logout") {
          dispatch(logout());
        } else if (CommandDataType.command === "search") {
          dispatch(searchMovie(CommandDataType.query));
        }
      },
    });
  }, [colorCtx, alanButtonRef, dispatch, navigate]);

  return { btnInstance: alanButtonRef.btnInstance };
};

export default useAlan;
