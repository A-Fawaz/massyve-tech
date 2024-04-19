import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function index() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);

  const fetchData = async () => {
    const { userId } = router.query;

    console.log(userId);

    try {
      const response = await axios.get(
        `http://localhost:3000/user/find/${userId}`,
        { withCredentials: true }
      );

      const { data } = response;
      if (response.status === 200) {
        setData(data);
        setLoading(false);

        console.log(response);
      }
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    setLoading(false);
  }, [router.query]);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data.user.firstname}</h1>
      <h1>{data.user.lastname}</h1>
    </div>
  );
}
export default index;
