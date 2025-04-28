import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
// import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
// import { db } from "@/db";
// import { usersTable } from "@/db/schema";

const  Home = async () => {
  // const result = await db.select().from(usersTable);

  // console.log(JSON.stringify(result, null, 2));
  return (
    <>
      <BookOverview 
        {...sampleBooks[0]}
      />
      <BookList
        title = 'Latest Books'
        books = {sampleBooks}
        containerClassName = 'mt-28 mx-auto'
      />
    </>
  );
}

export default Home;