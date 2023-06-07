import {useEffect, useState} from "react";
import "./App.css";
import PrecisionRoll from "./components/PrecisionRoll";
import {AnimatePresence, motion} from "framer-motion";

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
        <div className="shop_container" style={{display: "flex", gap: "40px"}}>
          <motion.div
            layoutId="shop_item1"
            className="shop_item"
            onClick={() => {
              setVisible(true);
              setShopId("shop_item1");
            }}
          >
            <img src={result.shop_picture} className="shop_item_picture" />
            <div className="shop_info_container">
              <p>{result?.shop_name}</p>
            </div>
          </motion.div>
          <motion.div
            layoutId="shop_item2"
            className="shop_item"
            onClick={() => {
              setVisible(true);
              setShopId("shop_item2");
            }}
          >
            <img src={result.shop_picture} className="shop_item_picture" />
            <div className="shop_info_container">
              <p>{result?.shop_name}</p>
            </div>
          </motion.div>
          <motion.div
            layoutId="shop_item3"
            className="shop_item"
            onClick={() => {
              setVisible(true);
              setShopId("shop_item3");
            }}
          >
            <img src={result.shop_picture} className="shop_item_picture" />
            <div className="shop_info_container">
              <p>{result?.shop_name}</p>
            </div>
          </motion.div>
        </div>
      )}
      {/* <PrecisionRoll R={0.5} /> */}
      {!loading && visible && (
        <AnimatePresence>
          <motion.div
            key="backdrop"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{delay: 0.1}}
            className="popup"
          >
            <motion.div
              key="modal"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{delay: 0.2}}
              layoutId={shopId}
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
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{delay: 0.3}}
                  src={result?.shop_picture}
                  className="shop_picture"
                />
                <motion.div className="shop_info_container">
                  <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{delay: 0.4}}
                    className="shop_precision"
                  >
                    <p className="shop_precision_text">Score Total</p>
                    <PrecisionRoll R={result?.total_shop_score / 100} />
                  </motion.div>
                  <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{delay: 0.5}}
                    className="shop_info"
                  >
                    <p className="shop_name">{result?.shop_name}</p>
                    <p className="shop_name">{result?.shop_adress}</p>
                    <p className="shop_name">
                      {result?.shop_manager_name +
                        " " +
                        result?.shop_manager_surname}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
              <div className="popup_body">
                {result?.data.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{delay: 0.6 + index * 0.1}}
                    className={"popup_body_container"}
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
                      <motion.span
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{delay: 0.6 + index * 0.15}}
                        className="popup_body_content_text"
                      >
                        <PrecisionRoll R={item?.R} />
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
