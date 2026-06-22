export function OperationsDashboard() {
  return (
    <main>
      <h1>Analytics Dashboard</h1>
      <Metric label="Activity" value="42" />
      <Metric label="Health" value="7" />
      <Chart title="Performance trend" />
    </main>
  );
}
