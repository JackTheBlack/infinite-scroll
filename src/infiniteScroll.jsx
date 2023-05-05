import React, { useState, useEffect, useRef } from 'react';
import Card from './card';
export const InfiniteScrollExample = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [three,setThree]=useState([]);
  const [index,setIndex]=useState(1);
  const [scroolTop, setScrollTop]=useState(document.documentElement.scrollTop)





  const setThreeMovies=(movies)=>{
    let newItems=items.slice(index,index);
    if (three.length<1){
      setThree(movies.slice(index,index+3));
   
      
    }else{
      

     
      setThree( [...three,...items.slice(index,index+3)])
    }
    console.log(three)
    console.log("page: ",page," response: ",movies)
    setIndex(index+3);

  }

  // ... rest of the component
    const fetchData = async () => {
  setIsLoading(true);
  setError(null); 
  const options = {
    method: 'GET'
  
}; 


  await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`,options)
  .then(response => response.json())
  .then(response =>( setItems([...items, ...response.results]),
                    setPage(page+ 1),setIsLoading(false),setThreeMovies(response.results)
                   ))
  .catch(err => (console.log(err),setIsLoading(false)));
  
 /**  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0b594805a17dec4e8de3882c93646258&language=en-US&page=1`);
    const data = await response.json();
console.log(response)
  //  setItems(prevItems => [...prevItems, ...response.json()]);
    setPage(prevPage => prevPage + 1);
  } catch (error) {
    setError(error);
  } finally {
    setIsLoading(false);
  }*/
};



const handleScroll = () => {
  if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
   console.log("inner hight: ",window.innerHeight)
   console.log("old scroll top: ",scroolTop)
   console.log("scroll Top: ", document.documentElement.scrollTop)
   console.log("offset hight: ",document.documentElement.offsetHeight)
   
   if ((document.documentElement.scrollTop-scroolTop )>56){
    fetchData();
    setScrollTop( document.documentElement.scrollTop);
   }

  }


};

useEffect(() => {
 fetchData();
},[]);


useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
});



const container={
  display:"grid",
  gridTemplateColumns:"auto auto auto",

  position:"relative",
  marginTop:"40%",
  top:"60%"
}


return (<>

    <div style={{ position:"relative", justifyItems:"center",  marginTop:"30%",display:"grid", gridTemplateColumns:"auto auto auto"}} >
    {three.map((item,index)=><div style={{position:"relative",marginTop:"4em"}} key={index}><Card item={item} /> </div> )}
    </div>

    <div style={{position:"ralive",marginTop:"40%"}}>

    </div>
    </>
  );
 
};