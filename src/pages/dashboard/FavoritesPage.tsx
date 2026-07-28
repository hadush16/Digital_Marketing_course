import { useAppSelector } from '@/hooks/useRedux'
import { MARKET_LISTINGS } from '@/data/mockDatabase'
import ListingCard from '@/components/marketplace/ListingCard'
import { HiHeart, HiShoppingBag } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function FavoritesPage() {
  const favoriteIds = useAppSelector((s) => s.favorites.items.map((f) => f.listingId))
  const favListings = MARKET_LISTINGS.filter((item) => favoriteIds.includes(item.id))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-light-text dark:text-dark-text flex items-center gap-2">
            <HiHeart className="text-red-500" /> My Saved Favorites
          </h1>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Bookmarked services, accounts, and digital products for easy access.
          </p>
        </div>
      </div>

      {favListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favListings.map((item, index) => (
            <ListingCard key={item.id} item={item} index={index} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-12 text-center border border-light-border dark:border-dark-border">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-red-500">
            <HiHeart className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">
            No Saved Listings Yet
          </h3>
          <p className="text-xs text-light-muted dark:text-dark-muted max-w-sm mx-auto mb-6">
            Click the heart icon on any marketplace listing to save it to your favorites.
          </p>
          <Link to="/marketplace" className="btn-primary btn-md inline-flex items-center gap-2">
            <HiShoppingBag /> Browse Marketplace
          </Link>
        </div>
      )}
    </div>
  )
}
