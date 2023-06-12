import {useEffect, useState} from "react";
import "./App.css";
import PrecisionRoll from "./components/PrecisionRoll";
import {AnimatePresence, motion} from "framer-motion";
import PopUp from "./components/PopUp";

function App() {
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopId, setShopId] = useState("");

  useEffect(() => {
    loading &&
      (async () => {
        const response = await fetch("http://localhost:8000/data");
        const data = await response.json();
        setResult(data);
        setLoading(false);
      })();
  }, [loading]);

  // if escape key is pressed, close the popup
  useEffect(() => {
    const closePopup = (e) => {
      if (e.key === "Escape" && visible) {
        setVisible(false);
      }
    };
    window.addEventListener("keydown", closePopup);
    return () => window.removeEventListener("keydown", closePopup);
  }, [visible]);

  return (
    <div className="App">
      <h2 className="page_title">Test React - Node JS - Display Data</h2>
      {!loading && (
        <div className="shop_container">
          {Array.from({length: 3}).map((_, i) => (
            <motion.div
              layoutId={`shop_item${i + 1}`}
              className="shop_item"
              onClick={() => {
                setVisible(true);
                setShopId(`shop_item${i + 1}`);
              }}
            >
              <img src={result.shop_picture} className="shop_item_picture" />
              <div className="shop_info_container">
                <p>{result?.shop_name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && visible && (
        <AnimatePresence>
          <PopUp setVisible={setVisible} result={result} shopId={shopId} />
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
