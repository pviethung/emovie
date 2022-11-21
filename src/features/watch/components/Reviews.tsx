import { MovieDetail } from '@/services/tmdb';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ReviewCard } from './ReviewCard';

export const Reviews = ({ reviews }: { reviews: MovieDetail['reviews'] }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={clsx('bg-base-100 pb-20 relative z-10')}>
      <div className={clsx('mb-4')}>
        <ReviewCard
          content={reviews.results[0].content}
          author={reviews.results[0].author}
          createdAt={reviews.results[0].created_at}
          imgSrc={reviews.results[0].author_details.avatar_path}
          rating={reviews.results[0].author_details.rating}
          key={reviews.results[0].id}
        />
      </div>
      <AnimatePresence>
        {show && (
          <div className={clsx('space-y-4')}>
            {reviews.results.length > 1 &&
              reviews.results.slice(1).map((r) => (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 1 }}
                  key={r.id}
                >
                  <ReviewCard
                    content={r.content}
                    author={r.author}
                    createdAt={r.created_at}
                    imgSrc={r.author_details.avatar_path}
                    rating={r.author_details.rating}
                  />
                </motion.div>
              ))}
          </div>
        )}
      </AnimatePresence>

      {!show && reviews.results.length > 1 && (
        <button
          className={clsx('link')}
          onClick={() => {
            setShow((prv) => !prv);
          }}
        >
          Read All Reviews
        </button>
      )}
    </div>
  );
};
