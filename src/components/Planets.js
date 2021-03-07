import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

// const fetchPlanets = async () => {
//   const res = await fetch("https://swapi.dev/api/planets/");
//   //this returns a promise
//   return res.json();
// };
// const fetchPlanets2 = async ({ queryKey }) => {
//   const [_key, page] = queryKey;
//   const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
//   //this returns a promise
//   return res.json();
// };
const fetchPlanets3 = async ({ queryKey }) => {
  console.log(queryKey);
  const [_key, page] = queryKey;
  console.log(page);

  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};
const Planets = () => {
  const [page, setPage] = useState(1);

  //useQuery manages fetching under the hood to grab the data initially and refetch data. Stale time allows us to make the query stay fresh for longer.
  // retry allows use to fetch a specified amount of time
  //cacheTime is how long the stale queries are cached for before they are disposed of, the default is 5 minutes. If you go between one component and back it won't fetch for another 5 minutes. If you want something to constantly fetch you would give it a small cacheTime, and no stale time. You can give another param of refetch on mount which mean everytime a new component mounts it refetches data, which is the set by default. We can use status functions like onSuccesss which will fire everytime you get a success status.We can use somehting like on error to show errors also so users can be notifited.
  //   const { data, status } = useQuery("planets", fetchPlanets, {
  //     staleTime: 0,
  //     cacheTime: 10,
  //     // onSuccess: () => console.log("Fetched")
  //     // onError: () => console.log("Error)

  //Query variables are variables that can be passed into a useQuery hook to be passed into the function to accept to the data. Eg something to add to an endpoint. We add our key as normal but within an array then pass it var's after. It takes each subsequent array value as an arg in the function after key.We can pass paramaters and destructure the array and output inside an endpoint. If we pass a dynamic variable whenever it is updated it will refetch the data. It will keep all the page cached though depending on details. It's fetching in the backround to see if you have any different data to what is cached but
  //   const { data, status } = useQuery(["planets", page], fetchPlanets2);

  //Pagination
  // with paginaiton instead of one data item we have two, resolvedData is the last successful data fetch that we have access to this is what is outputted, latestData is any data for any on going queries that isn't cached. They work by outputting reslovedData then if they request another page of data usePaginatedQuery will fetch that in the background for us. resolveData doesn't change latestData represents the new fetch while resolvedData doesn't change. While fetching it's undefined then becomes the new data we don't have. Once latestData is complete when put it under resolvedData. We have to add keepPrevious data to get pagination effected
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
    status,
  } = useQuery(["planets", page], fetchPlanets3, { keepPreviousData: true });

  console.log(isPreviousData);
  console.log(data);
  console.log(page);

  //   });
  return (
    <div>
      <h2>Planets</h2>
      {/* <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button> */}
      {status === "loading" && <div>Loading....</div>}
      {status === "error" && <div>Error</div>}
      {status === "success" && (
        <>
          {/* This math old seciton inputs two numbers and take the biggest out of the two */}
          <button
            disabled={page === 1}
            onClick={() => {
              // setPage((old) => Math.max(old - 1, 1))
              setPage((old) => Math.max(old - 1, 1));
            }}
          >
            Previous Page
          </button>
          <button>{page}</button>
          <button
            disabled={isPreviousData || !data.hasMore}
            // What this is saying is if we don't have data or don't have data on the next property then we will add a page number
            onClick={() => {
              console.log('click')
              if (!isPreviousData && data.hasMore) {
                setPage((old) => old + 1);
              }
            }}
          >
            Next Page
          </button>
          <div>
            {data.results.map((planet) => {
              return <Planet key={planet.name} planet={planet} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;

{
  /* <div>
          {data.results.map((planet) => {
            return <Planet key={planet.name} planet={planet} />;
          })}
        </div> */
}
