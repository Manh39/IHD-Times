// Re-export from live-ipo to prevent any stale static placeholder usage
export {
  AUDITED_IPO_REGISTRY as REAL_IPO_REGISTRY,
  getAllLiveIpos as getAllIpos,
  getLiveIpoBySlug as getIpoBySlug,
  getLiveIpoBySlug,
  fetchLiveIpos,
  type LiveIpo as IpoItem,
  type LiveIpo,
  type IpoFinancialMetric,
} from "./live-ipo"

