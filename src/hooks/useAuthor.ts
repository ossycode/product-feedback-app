import useFeedback from "./useFeedback";
import useUserSession from "./useUserSession";

const useAuthor = (id: string) => {
  const user = useUserSession();
  const { data, isLoading } = useFeedback(id);

  const authorId = data?.author._id;

  const isAuthor = authorId === user?.id;

  return isAuthor;
};

export default useAuthor;
