const Card = ({ exp }) => (
    <div className={`w-[85%] md:w-[45%] rounded-2xl border border-teal-500/20 bg-teal-950/30 p-4 sm:p-6 backdrop-blur-sm
    ${exp.left ? "ml-auto md:mr-auto md:ml-0" : "ml-auto"}`}
    >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3">
            <div>
                <h3 className="font-bold text-white text-base sm:text-lg">{exp.title}</h3>
                <p className="text-xs sm:text-sm text-teal-400/70 mt-0.5">{exp.company}</p>
            </div>
            <span className="shrink-0 text-[10px] sm:text-xs text-teal-400 border border-teal-500/30 bg-teal-500/10 rounded-full px-2 py-1">
                {exp.period}
            </span>
        </div>
        <p className="text-xs sm:text-sm text-white/50 leading-relaxed">{exp.description}</p>
    </div>
);

export default Card;
