import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAuth, LoginStatus } from "../Login/authslice";
import NoteField from "../NoteField";
import { getData } from "../../app/api";

export function Note() {
  const auth = useAppSelector(selectAuth);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    fetchData();
  }, [auth]);

  const fetchData = async () => {
    if (auth.status === LoginStatus.LOGGED_IN) {
      setLoading(true);
      const data = await getData(auth.user.id, auth.apiToken);
      data && setNote(data);
      setLoading(false);
    }
  };

  if (auth.status !== LoginStatus.LOGGED_IN) return null;

  return (
    <div>
      <NoteField note={note} setNote={setNote} auth={auth} loading={loading} />
    </div>
  );
}
