import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { agencyService, type CurrencyPair, type PaymentMethod } from '@/services/agency.service'

export default function ExchangeRatesPage() {
  const [pairs, setPairs] = useState<CurrencyPair[]>([])
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [amount, setAmount] = useState('100')
  const [selectedPairId, setSelectedPairId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([agencyService.getPublicExchangeRates(), agencyService.getPublicPaymentMethods()])
      .then(([ratesRes, methodsRes]) => {
        setPairs(ratesRes.data.data)
        setMethods(methodsRes.data.data)
        if (ratesRes.data.data.length > 0) setSelectedPairId(ratesRes.data.data[0].id)
      })
      .finally(() => setLoading(false))
  }, [])

  const activePair = pairs.find((p) => p.id === selectedPairId) || pairs[0]
  const converted = activePair ? (Number(amount || 0) * activePair.rate).toFixed(2) : '0.00'

  return (
    <>
      <Helmet>
        <title>Exchange Rates &amp; Payment Information — Ryoit Digital Marketing Agency</title>
        <meta name="description" content="Reference currency exchange rates, currency conversion calculator, and supported creator payout methods." />
      </Helmet>

      <div className="py-16 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-6xl space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-display font-black text-light-text dark:text-dark-text mb-4">
              Exchange Rates &amp; <span className="gradient-text">Payment Info</span>
            </h1>
            <p className="text-light-muted dark:text-dark-muted text-sm">
              Official, provider-synced, and administrator-managed reference rates are clearly labeled below. Manual reference rates are informational and not live bank rates.
            </p>
          </div>

          {/* Converter */}
          {activePair && (
            <div className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border">
              <h2 className="font-display font-bold text-xl text-light-text dark:text-dark-text mb-4">Currency Conversion Calculator</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input"
                />
                <select
                  value={selectedPairId}
                  onChange={(e) => setSelectedPairId(e.target.value)}
                  className="input"
                >
                  {pairs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.baseCurrency} → {p.targetCurrency} ({p.rateType})
                    </option>
                  ))}
                </select>
                <div className="p-3.5 rounded-xl bg-primary-500/10 border border-primary-500/30 text-lg font-display font-black text-primary-500 text-center">
                  {Number(converted).toLocaleString()} {activePair.targetCurrency}
                </div>
              </div>
              <p className="text-xs text-light-muted dark:text-dark-muted mt-3">
                Rate: 1 {activePair.baseCurrency} = {activePair.rate} {activePair.targetCurrency} • Source: <strong>{activePair.rateType}</strong> ({activePair.providerName || 'Admin Reference'}) • Updated {new Date(activePair.lastUpdatedAt).toLocaleString()}
              </p>
            </div>
          )}

          {/* Rates Grid */}
          {loading ? (
            <div className="text-center py-12 text-dark-muted">Loading exchange rates...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pairs.map((p) => (
                <div key={p.id} className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-light-text dark:text-dark-text">
                      {p.baseCurrency}/{p.targetCurrency}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-500/20 text-secondary-300">
                      {p.rateType}
                    </span>
                  </div>
                  <p className="text-2xl font-mono font-black text-primary-500">{p.rate}</p>
                  <p className="text-[11px] text-light-muted dark:text-dark-muted">{p.providerName || 'Reference Rate'}</p>
                  <p className="text-[10px] text-light-muted dark:text-dark-muted">
                    Updated: {new Date(p.lastUpdatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Payment Methods */}
          {methods.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-light-text dark:text-dark-text">
                Supported Payment &amp; Withdrawal Methods
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {methods.map((m) => (
                  <div key={m.id} className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border space-y-3">
                    <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text">{m.name}</h3>
                    <p className="text-xs text-light-muted dark:text-dark-muted">{m.description}</p>
                    {m.processingTime && <p className="text-xs text-primary-500 font-semibold">Processing: {m.processingTime}</p>}
                    {m.supportedCountries && m.supportedCountries.length > 0 && (
                      <p className="text-[11px] text-light-muted dark:text-dark-muted">
                        Countries: {m.supportedCountries.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

