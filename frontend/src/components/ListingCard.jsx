import { Link } from 'react-router-dom';

const ListingCard = ({ listing, onDelete }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="h-48 bg-gray-200 overflow-hidden">
        {listing.images.length > 0 ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
        <p className="text-gray-600 mb-2">{listing.location}</p>
        <p className="font-bold">${listing.price} <span className="font-normal text-gray-600">per night</span></p>
        
        <div className="mt-4 flex justify-between">
          <Link
            to={`/update-listing/${listing._id}`}
            className="text-rose-500 hover:text-rose-600 font-medium"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(listing._id)}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;