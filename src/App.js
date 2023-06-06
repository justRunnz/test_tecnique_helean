import {useEffect, useState} from "react";
import "./App.css";
import PrecisionRoll from "./components/PrecisionRoll";
import {AnimatePresence, motion} from "framer-motion";

function App() {
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loading &&
      (async () => {
        const response = await fetch("http://localhost:8000/data");
        const data = await response.json();
        console.log(data);
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
        <motion.div
          layoutId="shop_item"
          className="shop_item"
          onClick={() => setVisible(true)}
        >
          <img src={result.shop_picture} className="shop_item_picture" />
          <div className="shop_info_container">
            <p>{result?.shop_name}</p>
          </div>
        </motion.div>
      )}
      {/* <PrecisionRoll R={0.5} /> */}
      {!loading && visible && (
        <AnimatePresence>
          <div className="popup">
            <motion.div
              key="modal"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              layoutId="shop_item"
              className="popup_inner"
            >
              <button
                className="close_popup_button"
                onClick={() => setVisible(false)}
              >
                Close
              </button>
              <div className="popup_header">
                <motion.img
                  layoutId="shop_item_picture"
                  src={result?.shop_picture}
                  className="shop_picture"
                />
                <motion.div className="shop_info_container">
                  <div className="shop_precision">
                    <p className="shop_precision_text">Score Total</p>
                    <PrecisionRoll R={result?.total_shop_score / 100} />
                  </div>
                  <div className="shop_info">
                    <p className="shop_name">{result?.shop_name}</p>
                    <p className="shop_name">{result?.shop_adress}</p>
                    <p className="shop_name">
                      {result?.shop_manager_name +
                        " " +
                        result?.shop_manager_surname}
                    </p>
                  </div>
                </motion.div>
              </div>
              <div className="popup_body">
                {result?.data.map((item, index) => (
                  <motion.div
                    className={`popup_body_container ${
                      index === 0
                        ? "one"
                        : index === 1
                        ? "two"
                        : index === 2
                        ? "three"
                        : "four"
                    }`}
                  >
                    <motion.div className="popup_body_header">
                      <motion.p className="popup_body_header_text">
                        Score n°{index + 1}
                      </motion.p>
                      <p className="popup_body_header_text">R</p>
                    </motion.div>
                    <div className="popup_body_content">
                      <p className="popup_body_content_text">
                        {item.mean_shop}
                      </p>
                      <div className="popup_body_divider" />
                      <span className="popup_body_content_text">
                        <PrecisionRoll R={item?.R} />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
