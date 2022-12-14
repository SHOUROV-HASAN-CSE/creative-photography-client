import React from 'react';

const MyReviewCard = ({review, handleDelete}) => {

  const {_id, serviceName, reviewerPhoto, reviewerName, message } = review;

  

  return (
    <tr>
    <td>
        <div className="flex items-center space-x-3">
            <div className="avatar">
                <div className=" w-24 h-24 mask mask-squircle">
                    <img src={reviewerPhoto} alt="img not found" />
                </div>
            </div>
            <div>
               
                <div className="text">{message}</div>
            </div>
        </div>
    </td>
    <td>
        <div className="font-bold">{serviceName}</div>
    </td>
    <td> 
     {reviewerName}
    </td>
    <th>
        <button className="btn btn-ghost ">Edit</button>
        <button onClick={() => handleDelete(_id)} className="btn btn-ghost ">Delete</button>
    </th>
</tr>
  );
};

export default MyReviewCard;