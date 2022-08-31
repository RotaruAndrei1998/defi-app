const UserDetails = ({ accountAddress, currentAmount, stakedAmount }) => {
  return (
    <div className="flex flex-col">
      <div>{`Account address: ${accountAddress}`}</div>
      <div>{`Current amount: ${currentAmount}`}</div>
      <div>{`Staked amount: ${stakedAmount}`}</div>
    </div>
  );
};

export default UserDetails;
