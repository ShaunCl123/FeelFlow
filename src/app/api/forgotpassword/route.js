export async function GET(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")


  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const newpass = searchParams.get('newpass')
  const renewpass = searchParams.get('renewpass')

  console.log(email);
  console.log(newpass);
  console.log(renewpass);


 

  // database call goes here

  // at the end of the process we need to send something back.
  return Response.json({ "data":"valid" })
}

