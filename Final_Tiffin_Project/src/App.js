import "./App.css";
import NoteState from "./useContext/NotState";
import Main from "./Main";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <div>
      <CookiesProvider>
        <NoteState>
          <Main />
        </NoteState>
      </CookiesProvider>
    </div>
  );
}

export default App;
