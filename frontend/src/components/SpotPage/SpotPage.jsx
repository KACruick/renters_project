import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getDetails } from '../../store/spots';
import { fetchReviews } from '../../store/reviews';
import './SpotPage.css';
import { IoMdStar } from "react-icons/io";




function SpotPage() {

    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector((state) => state.spots.spotDetails);
    const reviews = useSelector((state) => state.reviews.reviewsBySpot[spotId] || [])

    console.log("spotId: ", spotId)
    // console.log("Spot from Redux state:", spot);
    
    useEffect(() => {
        dispatch(getDetails(spotId))
        dispatch(fetchReviews(spotId))
    }, [dispatch, spotId])

    console.log("spot details: ", spot)
    console.log("reviews: ", reviews)
    
    //helper functions for returning image urls
    // function mainImg(spot) {
    //     const img = spot.SpotImages.find((img) => img.id === 1);
    //     if (!img) return "https://placehold.co/600x400/ffcc00/png"
    //     return img.url
    // }
    // function otherImg(spot) {
    //     const imgs = spot.SpotImages.filter((img) => img.id !== 1);
    //     if (!imgs) return "https://placehold.co/600x400/ffcc00/png"
    // }
    
   

  return (
    <div className='spot-page-container'>

        <div className='spot-details-container'>
            <h1>Spot Page</h1>
            <div className='name'>{spot.name}</div>
            <div className='location'>{spot.city}, {spot.state}, {spot.country}</div>
            <div className='img-container'>
                <div className='main-img'> </div>
                <div className='other-img'> </div>
            </div>
            <div className='owner'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
            <div className='description'>{spot.description}</div>
            <div className='reserve-container'>
                <div className='reserve-box'>
                    <div className='price'>${spot.price}</div>
                    <div className='rating'><IoMdStar /> {spot.avgStarRating}</div>
                    <div className='num-reviews'>{spot.numReviews} reviews</div>
                </div>
                <div className='reserve-button'>
                    <button>Reserve</button>
                </div>
            </div>
        </div>

        <div className='reviews-container'>
 
            <div className='reviews-top'>
                <h3><IoMdStar /> {spot.avgStarRating}</h3>
                <h3>{spot.numReviews} reviews</h3>
            </div>

            <h2>Reviews</h2>
            {reviews && reviews.length > 0 ? (
            reviews.map((review) => {
            const reviewDate = new Date(review.createdAt);
            const formattedDate = reviewDate.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
            });

            return (
                <div key={review.id} className='review-card'>
                    <div className='review-header'>
                        <strong>{review.User?.firstName || 'Anonymous'}</strong>
                        <span>{formattedDate}</span>
                    </div>
                    <div className='review-body'>
                        <p>{review.review}</p>
                    </div>
                </div>
            );
            })
            ) : (
            <p>No reviews yet</p>
            )}
        </div>
    </div>
  )
}

export default SpotPage
//<div className='main-img'>  <img src={mainImg(spot)} alt={spot.name} /> </div>
//<div className='other-img'> {otherImg(spot).map((img) => (<img key={img.id} src={img.url} alt={`${spot.name} additional pictures`} />))} </div>

//<h3><IoMdStar /> {spot.avgStarRating}  {spot.numReviews} reviews  </h3>