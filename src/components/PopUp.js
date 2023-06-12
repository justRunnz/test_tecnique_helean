import {motion} from "framer-motion";
import React from "react";
import PrecisionRoll from "./PrecisionRoll";

function PopUp({setVisible, result, shopId}) {
  return (
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
                {result?.shop_manager_name + " " + result?.shop_manager_surname}
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
                <p className="popup_body_content_text">{item.mean_shop}</p>
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
  );
}

export default PopUp;
