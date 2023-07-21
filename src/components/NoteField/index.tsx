import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../app/hooks";
import { updateData } from "../../app/api";
import { User } from "../../models";
import styles from "./NoteField.module.css";

function NoteField({
  note,
  setNote,
  auth,
  loading,
}: {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  auth: { user: User; apiToken: string };
  loading: boolean;
}) {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [textAreaStyle, setTextAreaStyle] = useState(textArea.current?.style);
  const [status, setStatus] = useState<
    "" | "Loading" | "Saved" | "Opps Something went wrong"
  >("");

  const debounce = useDebounce(async () => {
    setStatus("Loading");
    const status = await updateData(auth.user.id, note, auth.apiToken);
    if (status) setStatus("Saved");
    else setStatus("Opps Something went wrong");
    setTimeout(() => setStatus(""), 3000);
  }, 1000);

  useEffect(() => {
    debounce();
    if (textArea.current && textAreaStyle) {
      const current = { ...textAreaStyle };
      current.height = textArea.current.scrollHeight + "px";
      setTextAreaStyle(current);
    } else setTextAreaStyle(textArea.current?.style);
  }, [note]);

  if (textArea.current && textAreaStyle)
    textArea.current.style.height = textAreaStyle.height;

  return (
    <>
      <textarea
        className={styles.textArea}
        placeholder="Note goes here..."
        value={note}
        onChange={({ target }) => !loading && setNote(target.value)}
        ref={textArea}
      ></textarea>
      <div className={styles.textAreaStatus}>
        {loading ? "Loading" : status}
      </div>
    </>
  );
}

export default NoteField;
