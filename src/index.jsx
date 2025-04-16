import { render } from "preact";
import { useState } from "preact/hooks";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./data/firebaseconfig";
import "./css/miligram.css";
import "./index.css";

export function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [validPrice, setValidPrice] = useState(null);

  const handleCheck = async () => {
    const code = input.trim().toUpperCase();

    if (!/^SH-[A-Z0-9]{6}$/.test(code)) {
      setMessage("Formato inválido");
      setValidPrice(null);
      return;
    }

    const codesRef = collection(db, "codesToUse");
    const q = query(codesRef, where("code", "==", code));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setMessage("no existe");
      setValidPrice(null);
      return;
    }

    const docSnap = querySnapshot.docs[0];
    const codeData = docSnap.data();
    setValidPrice(codeData.price);

    if (!codeData.claimed) {
      await updateDoc(docSnap.ref, { claimed: true });
      setMessage("codigo correcto, no fue reclamado");
    } else {
      setMessage("codigo existe, pero fue reclamado");
    }
  };

  const getTextColorClass = () => {
    if (message === "codigo correcto, no fue reclamado") return "text-success";
    if (message === "codigo existe, pero fue reclamado") return "text-warning";
    if (message === "Formato inválido" || message === "no existe") return "text-error";
    return "";
  };

  return (
    <main>
      <div className="wrapper">
        <h1>CheckCode</h1>
        <input
          type="text"
          name="code"
          id="inputCode"
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
        />
        <button onClick={handleCheck}>CHECK</button>

        {message && <h3 className={getTextColorClass()}>{message}</h3>}

        {validPrice && (
          <div className="checks-container">
            <h2>¡Premio!</h2>
            <h3>{validPrice}</h3>
          </div>
        )}
      </div>
    </main>
  );
}

render(<App />, document.getElementById("app"));
