const RateLimits = ({ rateLimit }) => {
  const limits = rateLimit.resources;
  return (
    <div id="rate-limits">
      <div className="badge text" style={{ display: "block" }}>
        <span className="h5">{`Current rate limits`}</span>
        <p
          className="h6"
          style={{ width: "80%", whiteSpace: "pre-wrap", margin: "10px auto" }}
        >
          *graphql and rest limits reset every hour, while search limits
          reset every 60 seconds
        </p>
      </div>
      <div className="badge text-bg-secondary">
        <span className="h6">
          {"Search"}: {`${limits.search.remaining}/${limits.search.limit}`}
        </span>
      </div>
      <div className="badge text-bg-secondary">
        <span className="h6">
          {"REST"}: {`${limits.core.remaining}/${limits.core.limit}`}
        </span>
      </div>
      <div className="badge text-bg-secondary">
        <span className="h6">
          {"GraphQL"}: {`${limits.graphql.remaining}/${limits.graphql.limit}`}
        </span>
      </div>
    </div>
  );
};
export default RateLimits;
