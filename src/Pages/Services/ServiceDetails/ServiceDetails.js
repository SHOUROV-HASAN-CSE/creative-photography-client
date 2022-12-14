import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Link, useLoaderData} from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
import { TabTitle } from '../../../Utilitis/FunctiionTitle';
import ServiceReviewCard from './ServiceReviewCard';

const ServiceDetails = () => {
    TabTitle('Service Details');

     const location  = useLocation();

  const {user} = useContext(AuthContext);
  const {_id, title, img, price, description} = useLoaderData();

  const handlePlaceReview = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = user?.email || 'unregistered';
    const message = form.message.value;


    const review = {
        serviceId: _id,
        serviceName: title,
        reviewerId: user.uid,
        reviewerName: name,
        reviewerPhoto: user.photoURL,
        email,
        message
    }


    fetch('https://creative-photography-server-two.vercel.app/reviews', {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(review)
  })
      .then(res => res.json())
      .then(data => {
          if(data.acknowledged){
              alert('Review placed successfully')
              form.reset();   
          }
      })
      .catch(err => console.error(err));
  }


  const [reviews, setReviews] = useState([]);

  useEffect(() => {
      fetch(`https://creative-photography-server-two.vercel.app/review?serviceid=${_id}`)
          .then(res => res.json())
          .then(data => setReviews(data))
  });



  return (
    <div>
         <h2 className='text-5xl font-semibold text-center text-orange-600 my-3'>Service Details</h2>
      <div className="card card-compact w-4/5 bg-base-100 shadow-2xl mx-auto my-20">
      <figure><img src={img} alt=""/></figure>
      <div className="card-body">
        <h2 className="card-title text-5xl mx-auto text-amber-600">{title}</h2>
        <p className='text-lg'>{description}</p>
        <p className='text-3xl text-orange-600 font-semibold text-center'>Price: ${price}</p>
        <div className="card-actions justify-end">
        
        </div>
      </div>
    </div>

        {/* review section */}

        <div className=" w-4/5 mx-auto rounded-2xl mb-10 shadow-2xl">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th> Image</th>
                            <th>Review</th>
                            <th>Reviewer Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        reviews.map(review => <ServiceReviewCard
                        key={review._id}
                        review={review}
                        ></ServiceReviewCard>)
                    }
                    </tbody>
                </table>
            </div>

        {/* form Section */}
        {user?.uid? <div className='w-4/5 mx-auto mb-8 bg-slate-100 rounded-2xl shadow-2xl p-8'>
    <form onSubmit={handlePlaceReview}>
                <h2 className="text-4xl font-semibold text-center my-8">Please keep your Review</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5'>
                    <input name="name" type="text" placeholder="Your Name" className="input input-ghost w-full  input-bordered input-success" required/>
                    <input name="email" type="text" placeholder="Your email" defaultValue={user?.email} className="input input-ghost w-full  input-bordered input-primary" readOnly />
                </div>
                <textarea name="message" className="textarea textarea-bordered textarea-secondary h-24 w-full" placeholder="Your Review" required></textarea>

                <div className='text-center mt-3'>
                <input className='btn btn-outline btn-secondary' type="submit" value="Place Your review" />
                </div>
            </form>
    </div> 
    :
    <div>
        <div className='flex justify-center'>
         <Link to='/login' ><button className='  btn btn-warning my-3 '> if you want to review Please login first.</button></Link></div>
         <Navigate  state={{from: location}} replace></Navigate>;
    </div>
     }


    </div>
  );
};

export default ServiceDetails;