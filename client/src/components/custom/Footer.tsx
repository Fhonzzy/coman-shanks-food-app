const Footer = () => {
	return (
		<div className="flex justify-between items-center bg-red-500 py-10">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div>
				<h1 className="text-3xl font-bold tracking-tight text-white mb-3">ComanShanks</h1>
			</div>
			<div className="flex gap-5 text-white">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
            </div>
            </div>
		</div>
	);
};

export default Footer;
