import { useNavigate } from "react-router-dom";

export default function useRedirect(page) {
  const navigate = useNavigate();
  return () => navigate("/" + page);
}
