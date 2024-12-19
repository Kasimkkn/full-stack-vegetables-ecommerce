interface TopCardsProps {
    totalProducts: number;
    totalUsers: number;
    totalRevenue: number;
    todaysRevenue: number;
}

const TopCards = ({ totalProducts, totalUsers, totalRevenue, todaysRevenue }: TopCardsProps) => {
    const cards = [
        { title: "Total Products", value: totalProducts },
        { title: "Total Users", value: totalUsers },
        { title: "Total Revenue", value: `₹${totalRevenue}` },
        { title: "Today's Revenue", value: `₹${todaysRevenue}` },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <div key={index} className="bg-white p-4 shadow rounded-lg">
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-2xl">{card.value}</p>
                </div>
            ))}
        </div>
    );
};

export default TopCards;
