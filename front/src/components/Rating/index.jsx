import React from 'react'

const Rating = ({ handleRating, rating }) => {

    return (
        <div className="recipe_rating">
            <span
                style={{
                    fontSize: "30px",
                    color: 1 <= rating ? "gold" : "gray",
                    cursor: 'pointer'
                }}
                onClick={() => handleRating(1)}
            >
                ★
            </span>
            <span
                style={{
                    fontSize: "30px",
                    color: 2 <= rating ? "gold" : "gray",
                    cursor: 'pointer'
                }}
                onClick={() => handleRating(2)}
            >
                ★
            </span>
            <span
                style={{
                    fontSize: "30px",
                    color: 3 <= rating ? "gold" : "gray",
                    cursor: 'pointer'
                }}
                onClick={() => handleRating(3)}
            >
                ★
            </span>
            <span
                style={{
                    fontSize: "30px",
                    color: 4 <= rating ? "gold" : "gray",
                    cursor: 'pointer'
                }}
                onClick={() => handleRating(4)}
            >
                ★
            </span>
            <span
                style={{
                    fontSize: "30px",
                    color: 5 <= rating ? "gold" : "gray",
                    cursor: 'pointer'
                }}
                onClick={() => handleRating(5)}
            >
                ★
            </span>
        </div>
    )
}

export default Rating