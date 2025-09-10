class Bank {
  /**
   * Create a new Bank for a customer
   * @param {string} name – the customer’s name
   */
  constructor(name) {
    // store the customer’s name
    this.name = name;

    // initialize each sub-account with a zero balance
    this.accounts = {
      Checking: 0,
      College: 0,
      Investing: 0,
      Saving: 0,
    };
  }

  /**
   * Deposit money into one of your accounts
   * @param {string} accountName – name of sub-account
   * @param {number} amount – dollars to deposit (must be > 0)
   */
  deposit(accountName, amount) {
    // validate account exists
    if (!(accountName in this.accounts)) {
      console.error(`Account “${accountName}” does not exist.`);
      return;
    }
    // validate positive amount
    if (amount <= 0) {
      console.error('Deposit amount must be positive.');
      return;
    }
    // perform deposit
    this.accounts[accountName] += amount;
    console.log(
      `Deposited $${amount.toFixed(2)} to ${accountName}. ` +
      `New balance: $${this.accounts[accountName].toFixed(2)}.`
    );
  }

  /**
   * Withdraw money from one of your accounts
   * @param {string} accountName – name of sub-account
   * @param {number} amount – dollars to withdraw (must be > 0)
   */
  withdraw(accountName, amount) {
    // validate account exists
    if (!(accountName in this.accounts)) {
      console.error(`Account “${accountName}” does not exist.`);
      return;
    }
    // validate positive amount
    if (amount <= 0) {
      console.error('Withdrawal amount must be positive.');
      return;
    }
    // check sufficient funds
    if (this.accounts[accountName] < amount) {
      console.error(`Insufficient funds in ${accountName}.`);
      return;
    }
    // perform withdrawal
    this.accounts[accountName] -= amount;
    console.log(
      `Withdrew $${amount.toFixed(2)} from ${accountName}. ` +
      `New balance: $${this.accounts[accountName].toFixed(2)}.`
    );
  }

  /**
   * Transfer money from one sub-account to another
   * @param {string} from – source account name
   * @param {string} to – destination account name
   * @param {number} amount – dollars to transfer
   */
  transfer(from, to, amount) {
    // reuse withdraw & deposit logic
    console.log(`Transferring $${amount.toFixed(2)} from ${from} to ${to}…`);
    this.withdraw(from, amount);
    this.deposit(to, amount);
  }

  /**
   * Get the current balance of one sub-account
   * @param {string} accountName
   * @returns {number} balance
   */
  getBalance(accountName) {
    if (!(accountName in this.accounts)) {
      console.error(`Account “${accountName}” does not exist.`);
      return null;
    }
    return this.accounts[accountName];
  }

  /** 
   * Print all account balances to the console 
   */
  printStatement() {
    console.log(`\nAccount statement for ${this.name}:`);
    for (const [acct, bal] of Object.entries(this.accounts)) {
      console.log(`  • ${acct}: $${bal.toFixed(2)}`);
    }
    console.log(''); // blank line
  }
}

// ————————————————
// Example usage:

const myBank = new Bank('Michael');
myBank.deposit('Checking', 500);
myBank.deposit('Saving', 200);
myBank.withdraw('College', 50);      // error: insufficient funds
myBank.transfer('Checking', 'Investing', 150);
console.log('Checking balance:', myBank.getBalance('Checking'));
myBank.printStatement();

    
