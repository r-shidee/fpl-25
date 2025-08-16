export default async function Page() {
	return (
		<div className="grid gap-4">
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
				<div className="lg:col-span-4">
					<div className="card--player">
						<div className="p-4">
							<h1 className="text-2xl font-bold">Fixtures</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
