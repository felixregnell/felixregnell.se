enum BusinessCategory {
    All,
    Groceries,
    Restaurants,
    Travel,
    Entertainment,
}

type BusinessCategorySummary = { category: BusinessCategory, categoryName: string, amount: number };

function businessCategoryToString(type: BusinessCategory) {
    const names: string[] = Object.keys(BusinessCategory).filter(key => isNaN(Number(key)));
    return names[type];
}

class Business {
    readonly name: string;
    readonly type: BusinessCategory;

    constructor(name: string, type: BusinessCategory) {
        this.name = name;
        this.type = type;
    }
}

class Transaction {
    readonly date: Date;
    readonly amount: number;
    readonly business: Business;

    constructor(date: Date, amount: number, business: Business) {
        this.date = date;
        this.amount = amount;
        this.business = business;
    }


    static getBusinessSummaries(transactions: Transaction[]): BusinessCategorySummary[] {
        let summaries: BusinessCategorySummary[] = [];
        const nbrCategories = Object.keys(BusinessCategory).length
        for (let i = 0; i < nbrCategories; ++i) {
            const amount = transactions
                .filter(t => t.business.type === i)
                .reduce((sum, transaction) => sum + transaction.amount, 0);
            summaries[i] = { category: i, categoryName: businessCategoryToString(i), amount }
        }
        return summaries;
    }
}

export { Transaction, Business, BusinessCategory, type BusinessCategorySummary, businessCategoryToString }