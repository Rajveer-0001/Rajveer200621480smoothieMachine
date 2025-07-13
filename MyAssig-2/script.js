/**
 * The Smoothie Machine 
 * Object oriented approach to smoothie ordering system
 */

/**
 * Represents a custom smoothie order
 */
class Smoothie {
    /**
     * Constructor for Smoothie class
     * @param {string} name - Add a Name of the smoothie
     * @param {string} customerName - Name of the customer
     * @param {string} size - Size of the smoothie (small, medium, large)
     * @param {string} baseLiquid - Base liquid for the smoothie
     */
    constructor(name, customerName, size, baseLiquid) {
        this.name = name || 'Custom Smoothie';
        this.customerName = customerName || 'Anonymous';
        this.size = size;
        this.baseLiquid = baseLiquid;
        this.fruits = [];
        this.vegetables = [];
        this.proteins = [];
        this.extras = [];
        this.totalPrice = 0;
        this.basePrice = 0;
        this.baseLiquidPrice = 0;
        this.createdAt = new Date();
    }

    /**
     * Add fruit to the smoothie
     * @param {string} fruit - Name of the fruit
     * @param {number} price - Price of the fruit
     */
    addFruit(fruit, price = 0) {
        this.fruits.push({ name: fruit, price: price });
        this.updateTotalPrice();
    }

    /**
     * Adding vegetable in the smoothie
     * @param {string} vegetable - Name of the vegetables
     * @param {number} price - Price of the vegetables
     */
    addVegetable(vegetable, price = 0) {
        this.vegetables.push({ name: vegetable, price: price });
        this.updateTotalPrice();
    }

    /**
     * Adding protein 
     * @param {string} protein - Name of the protein
     * @param {number} price - Price of the protein
     */
    addProtein(protein, price = 0) {
        this.proteins.push({ name: protein, price: price });
        this.updateTotalPrice();
    }

    /**
     * Add extra ingredient 
     * @param {string} extra - Name of the extra ingredient
     * @param {number} price - Price of the extra ingredient
     */
    addExtra(extra, price = 0) {
        this.extras.push({ name: extra, price: price });
        this.updateTotalPrice();
    }

    /**
     *  price based on size
     * @param {number} basePrice -  price for the size
     */
    setBasePrice(basePrice) {
        this.basePrice = basePrice;
        this.updateTotalPrice();
    }

    /**
     * adding liquid price
     * @param {number} baseLiquidPrice - Price for the  liquid
     */
    setBaseLiquidPrice(baseLiquidPrice) {
        this.baseLiquidPrice = baseLiquidPrice;
        this.updateTotalPrice();
    }

    /**
     * total price of the smoothie
     */
    updateTotalPrice() {
        let total = this.basePrice || 0;
        total += this.baseLiquidPrice || 0;
        
        // Add fruit prices
        this.fruits.forEach(fruit => total += fruit.price);
        
        // Add vegetable prices
        this.vegetables.forEach(vegetable => total += vegetable.price);
        
        // Add protein prices
        this.proteins.forEach(protein => total += protein.price);
        
        // Add extra prices
        this.extras.forEach(extra => total += extra.price);
        
        this.totalPrice = total;
    }

    /**
     * smoothie completed 
     * @returns {string} Formatted description
     */
    getDescription() {
        let description = `${this.name} (${this.size}) with ${this.baseLiquid} base`;
        
        if (this.fruits.length > 0) {
            description += `, ${this.fruits.map(f => f.name).join(', ')}`;
        }
        
        if (this.vegetables.length > 0) {
            description += `, ${this.vegetables.map(v => v.name).join(', ')}`;
        }
        
        if (this.proteins.length > 0) {
            description += `, ${this.proteins.map(p => p.name).join(', ')}`;
        }
        
        if (this.extras.length > 0) {
            description += `, ${this.extras.map(e => e.name).join(', ')}`;
        }
        
        return description;
    }

    /**
     * adding ingredient 
     * @param {string} name - Raw ingredient name
     * @returns {string}
     */
    formatIngredientName(name) {
        return name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    /**
     *  display smoothie on screen
     * @returns {string} string for display
     */
    generateDisplay() {
        let html = `<div class="ingredient-list">`;
        
        // Size and Base
        html += `<div class="ingredient-category">
            <strong>Size:</strong> ${this.size.charAt(0).toUpperCase() + this.size.slice(1)}
        </div>`;
        
        html += `<div class="ingredient-category">
            <strong>Base:</strong> ${this.formatIngredientName(this.baseLiquid)}
        </div>`;
        
        // Fruits
        if (this.fruits.length > 0) {
            html += `<div class="ingredient-category">
                <strong>Fruits:</strong> ${this.fruits.map(f => this.formatIngredientName(f.name)).join(', ')}
            </div>`;
        }
        
        // Vegetables
        if (this.vegetables.length > 0) {
            html += `<div class="ingredient-category">
                <strong>Vegetables:</strong> ${this.vegetables.map(v => this.formatIngredientName(v.name)).join(', ')}
            </div>`;
        }
        
        // Proteins
        if (this.proteins.length > 0) {
            html += `<div class="ingredient-category">
                <strong>Proteins:</strong> ${this.proteins.map(p => this.formatIngredientName(p.name)).join(', ')}
            </div>`;
        }
        
        // Extras
        if (this.extras.length > 0) {
            html += `<div class="ingredient-category">
                <strong>Extras:</strong> ${this.extras.map(e => this.formatIngredientName(e.name)).join(', ')}
            </div>`;
        }
        
        html += `</div>`;
        return html;
    }

    /**
     * Additional  information
     * @returns {object} Nutritional data
     */
    getNutritionalInfo() {
        //ngredients details
        let calories = 0;
        let protein = 0;
        let fiber = 0;
        let vitamins = [];

        // info about calories 
        switch(this.size) {
            case 'small': calories += 50; break;
            case 'medium': calories += 75; break;
            case 'large': calories += 100; break;
        }

        // Add fruit calories and vitamins
        this.fruits.forEach(fruit => {
            calories += 60;
            fiber += 2;
            switch(fruit.name) {
                case 'banana': vitamins.push('Potassium'); break;
                case 'strawberry': vitamins.push('Vitamin C'); break;
                case 'blueberry': vitamins.push('Antioxidants'); break;
                case 'mango': vitamins.push('Vitamin A'); break;
            }
        });

        // Add protein values
        this.proteins.forEach(proteinItem => {
            switch(proteinItem.name) {
                case 'protein-powder': protein += 25; calories += 120; break;
                case 'greek-yogurt': protein += 15; calories += 100; break;
                case 'peanut-butter': protein += 8; calories += 190; break;
                case 'chia-seeds': protein += 5; calories += 60; fiber += 5; break;
            }
        });

        return {
            calories,
            protein,
            fiber,
            vitamins: [...new Set(vitamins)] 
        };
    }
}

/**
 * Manage the ordering process
 */
class SmoothieOrderSystem {
    constructor() {
        this.currentSmoothie = null;
        this.orderHistory = [];
        this.initializeEventListeners();
    }

    /**
     * add event listeners for orders
     */
    initializeEventListeners() {
        const form = document.getElementById('smoothieForm');
        form.addEventListener('submit', (e) => this.handleOrderSubmit(e));
        
        // Add fruit limit
        const fruitCheckboxes = document.querySelectorAll('input[name="fruits"]');
        fruitCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.limitFruitSelection());
        });
        
        // Add protein  limit (max 2)
        const proteinCheckboxes = document.querySelectorAll('input[name="proteins"]');
        proteinCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.limitProteinSelection());
        });
        this.addFormValidation();
    }

    /**
     * Add real-time 
     */
    addFormValidation() {
        const requiredFields = ['customerName', 'size', 'baseLiquid'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }

    /**
     * checking individual 
     * @param {HTMLElement} field 
     */
    validateField(field) {
        const value = field.value.trim();
        
        if (!value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        // Additional name data for customer 
        if (field.id === 'customerName' && value.length < 2) {
            this.showFieldError(field, 'Name must be at least 2 characters');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    /**
     * error message
     * @param {HTMLElement} field - wrong
     * @param {string} message - Error message
     */
    showFieldError(field, message) {
        this