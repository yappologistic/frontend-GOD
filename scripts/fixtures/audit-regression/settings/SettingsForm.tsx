export function SettingsForm() {
  return (
    <form>
      <input placeholder="Email address" />
      <input placeholder="Display name" autoFocus />
      <p style={{ color: "#dc2626" }}>Required fields are missing.</p>
      <button>Save</button>
    </form>
  );
}
