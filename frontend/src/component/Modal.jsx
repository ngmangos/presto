const Modal = ({ innerRef, heading, text, newDeck, newDeckTitle, setNewDeckTitle, deleteItem, closeModal }) => {
  /* three kinds of modals:
   *   1. lets user input text and confirm/cancel, has no text element
   *   2. only lets user confirm or cancel
   *   3. error alerts
   */
  return <>
    <dialog ref={innerRef}>
      { text ? (
        <>
          <h2>{heading}</h2>
          <p>{text}</p>
          <button onClick={deleteItem}>Confirm</button>
          <button onClick={closeModal}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{heading}</h2>
          <label htmlFor='title'>Title</label>
          <input type="text" id="title" name="title" value={newDeckTitle} onChange={e => setNewDeckTitle(e.target.value) }/>
          { heading !== 'Edit presentation title' ? (
            <>
              <button onClick={newDeck}>Create</button>
              <button onClick={closeModal}>Cancel</button>
            </>
          ) : (
            <button onClick={newDeck}>Confirm</button>
          )}
        </>
      )}
    </dialog>
  </>;
}

export default Modal;
