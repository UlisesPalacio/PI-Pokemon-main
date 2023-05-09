import React from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes, setError } from "../actions";
import notFound from "../styles/gif/notFound2.png";
import styles from "../styles/Error.module.css";

function Error() {
  const dispatch = useDispatch();

  const handleHome = (event) => {
    event.preventDefault();
    dispatch(setError(false));
    dispatch(getPokemons());
    dispatch(getTypes());
  };
  return (
    <div className={styles.contError}>
      <img src={notFound} alt="notFound" className={styles.notFound} />
      <div className={styles.texto}>
        <div className={styles.text}>SORRY</div>
        <div className={styles.parrafo}> Pokemon not Found</div>
      </div>
      <button onClick={(e) => handleHome(e)} className={styles.button}>
        Return to home
      </button>
    </div>
  );
}

export default Error;