import React from 'react';

interface Review {
  userId: string;
  userName: string;
  text: string;
  createdAt: Date;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className="reviews-container space-y-6">
      <h2 className="reviews-heading text-2xl font-bold">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="review-item p-4 bg-white shadow-md rounded-md">
              <p className="review-user font-semibold">{review.userName}</p>
              <p className="review-text">{review.text}</p>
              <p className="review-date text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
