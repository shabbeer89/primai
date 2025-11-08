import Link from "next/link";

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 mb-8">
              <span className="text-2xl">🚀</span>
              <span className="text-white font-medium">Unlock Your Earnings in the Web3 Revolution</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              PrimAI Affiliate Plan
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Where Innovation Meets Income
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
              >
                Apply as BDE
              </Link>
              <Link
                href="/get-started"
                className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Apply as BDM
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Welcome Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 mb-12">
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 block">💎</span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to the Next-Gen Affiliate Advantage
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              At <strong className="text-white">PrimAI</strong>, we're not just building the future of Web3, AI, and digital transformation — we're empowering <strong className="text-white">YOU</strong> to profit from it. Our affiliate structure is designed to reward ambition, collaboration, and results. Whether you're closing deals solo or leading a powerhouse team, your success = our success.
            </p>
          </div>
        </div>

        {/* Affiliate Structure */}
        <div className="space-y-12">
          {/* BDE Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-4xl mb-4 block">1️⃣</span>
              <h3 className="text-3xl font-bold text-white mb-4">
                Business Development Executive (BDE)
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Who You Are:</h4>
                <p className="text-gray-300 mb-6">
                  You're the rainmaker. The hustler. You turn prospects into partners and ideas into invoices. You're on the frontlines, closing deals and building your track record.
                </p>

                <h4 className="text-xl font-semibold text-white mb-4">What You Earn:</h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <table className="w-full text-white">
                    <thead>
                      <tr>
                        <th className="text-left py-2">Action</th>
                        <th className="text-left py-2">Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">Close a deal on your own</td>
                        <td className="py-2 font-semibold text-green-400">5% of invoice price</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Examples:</h4>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-300">Close a <span className="text-white font-semibold">$100,000</span> deal</p>
                    <p className="text-2xl font-bold text-green-400">→ You earn $5,000</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-300">Close a <span className="text-white font-semibold">$250,000</span> deal</p>
                    <p className="text-2xl font-bold text-green-400">→ You earn $12,500</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BDM Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-4xl mb-4 block">2️⃣</span>
              <h3 className="text-3xl font-bold text-white mb-4">
                Business Development Manager (BDM)
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Who You Are:</h4>
                <p className="text-gray-300 mb-6">
                  You're a closer AND a leader. You bring deals home directly while building and managing a winning team of Business Development Executives.
                </p>

                <h4 className="text-xl font-semibold text-white mb-4">What You Earn:</h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <table className="w-full text-white">
                    <thead>
                      <tr>
                        <th className="text-left py-2">Action</th>
                        <th className="text-left py-2">Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">Close a direct sale yourself</td>
                        <td className="py-2 font-semibold text-green-400">10% of total project value</td>
                      </tr>
                      <tr>
                        <td className="py-2">Your BDE closes a deal</td>
                        <td className="py-2 font-semibold text-green-400">5% manager bonus</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Double Income Stream:</h4>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-300">Your direct sale of <span className="text-white font-semibold">$200,000</span></p>
                    <p className="text-2xl font-bold text-green-400">→ You earn $20,000</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-300">Your BDE closes <span className="text-white font-semibold">$150,000</span></p>
                    <p className="text-2xl font-bold text-green-400">→ You earn $7,500 (manager bonus)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border-2 border-yellow-400">
                    <p className="text-yellow-400 font-semibold">💡 TL;DR: Build your team, multiply your earnings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performer Bonus */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-4xl mb-4 block">3️⃣</span>
              <h3 className="text-3xl font-bold text-white mb-4">
                Monthly Top Performer Bonus
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">The Competition:</h4>
                <p className="text-gray-300 mb-6">
                  Every month, we track who's generating the <strong className="text-white">highest direct sales volume</strong> — whether you're a BDM or BDE.
                </p>

                <h4 className="text-xl font-semibold text-white mb-4">The Prize:</h4>
                <p className="text-gray-300 mb-4">
                  The #1 performer receives an <strong className="text-green-400">additional 1% bonus</strong> on their total monthly sales volume.
                </p>

                <h4 className="text-xl font-semibold text-white mb-4">Who Qualifies:</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>✅ BDEs competing based on their individual sales</li>
                  <li>✅ BDMs competing based on their direct sales (not including team bonuses)</li>
                  <li>✅ One winner per month gets the spotlight + cash bonus</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Bonus Examples:</h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <table className="w-full text-white">
                    <thead>
                      <tr>
                        <th className="text-left py-2">Your Monthly Sales</th>
                        <th className="text-left py-2">Base Commission</th>
                        <th className="text-left py-2">Top Performer (1%)</th>
                        <th className="text-left py-2 font-bold">Total Earnings</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">$100,000</td>
                        <td className="py-2">$5,000 - $10,000</td>
                        <td className="py-2 text-green-400">+$1,000</td>
                        <td className="py-2 font-bold text-green-400">$6,000 - $11,000</td>
                      </tr>
                      <tr>
                        <td className="py-2">$250,000</td>
                        <td className="py-2">$12,500 - $25,000</td>
                        <td className="py-2 text-green-400">+$2,500</td>
                        <td className="py-2 font-bold text-green-400">$15,000 - $27,500</td>
                      </tr>
                      <tr>
                        <td className="py-2">$500,000</td>
                        <td className="py-2">$25,000 - $50,000</td>
                        <td className="py-2 text-green-400">+$5,000</td>
                        <td className="py-2 font-bold text-green-400">$30,000 - $55,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-400 rounded-lg p-4 mt-4">
                  <p className="text-yellow-400 font-semibold">💰 This is EXTRA money on top of your standard commission.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Promotion Path */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border-2 border-yellow-400">
            <div className="text-center mb-8">
              <span className="text-4xl mb-4 block">4️⃣</span>
              <h3 className="text-3xl font-bold text-white mb-4">
                The Ultimate Promotion Path: BDE → BDM
              </h3>
              <div className="text-6xl mb-4">🔥</div>
              <h4 className="text-2xl font-bold text-yellow-400 mb-4">
                WIN 3 CONSECUTIVE MONTHS = BECOME A BDM
              </h4>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">The Rule:</h4>
                <p className="text-gray-300 mb-6">
                  Any <strong className="text-white">Business Development Executive (BDE)</strong> who achieves the <strong className="text-white">highest monthly sales volume for 3 consecutive months</strong> automatically <strong className="text-yellow-400">replaces the current BDM and earns promotion to BDM status</strong>.
                </p>

                <div className="bg-white/5 rounded-lg p-4">
                  <table className="w-full text-white">
                    <thead>
                      <tr>
                        <th className="text-left py-2">Criteria</th>
                        <th className="text-left py-2">Requirement</th>
                        <th className="text-left py-2">Reward</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">Performance Period</td>
                        <td className="py-2">3 consecutive months</td>
                        <td className="py-2 text-yellow-400">Automatic promotion</td>
                      </tr>
                      <tr>
                        <td className="py-2">Target</td>
                        <td className="py-2">Highest direct sales volume each month</td>
                        <td className="py-2 text-yellow-400">Replace existing BDM</td>
                      </tr>
                      <tr>
                        <td className="py-2">New Status</td>
                        <td className="py-2">BDM with full privileges</td>
                        <td className="py-2 text-yellow-400">10% direct + 5% team bonuses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Real Example: The 3-Month Path to Leadership</h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <table className="w-full text-white">
                    <thead>
                      <tr>
                        <th className="text-left py-2">Month</th>
                        <th className="text-left py-2">Sales Closed</th>
                        <th className="text-left py-2">BDE Commission (5%)</th>
                        <th className="text-left py-2">Top Performer (1%)</th>
                        <th className="text-left py-2 font-bold">Monthly Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">Month 1</td>
                        <td className="py-2">$200,000</td>
                        <td className="py-2">$10,000</td>
                        <td className="py-2 text-green-400">+$2,000</td>
                        <td className="py-2 font-bold text-green-400">$12,000</td>
                      </tr>
                      <tr>
                        <td className="py-2">Month 2</td>
                        <td className="py-2">$250,000</td>
                        <td className="py-2">$12,500</td>
                        <td className="py-2 text-green-400">+$2,500</td>
                        <td className="py-2 font-bold text-green-400">$15,000</td>
                      </tr>
                      <tr>
                        <td className="py-2">Month 3</td>
                        <td className="py-2">$300,000</td>
                        <td className="py-2">$15,000</td>
                        <td className="py-2 text-green-400">+$3,000</td>
                        <td className="py-2 font-bold text-green-400">$18,000</td>
                      </tr>
                      <tr className="border-t border-white/20">
                        <td className="py-2 font-bold text-yellow-400">3-Month Total</td>
                        <td className="py-2 font-bold text-yellow-400">$750,000</td>
                        <td className="py-2 font-bold text-yellow-400">$37,500</td>
                        <td className="py-2 font-bold text-yellow-400">+$7,500</td>
                        <td className="py-2 font-bold text-yellow-400">$45,000</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold text-yellow-400" colSpan={5}>NEW STATUS → BDM PROMOTION</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-400 rounded-lg p-4 mt-4">
                  <p className="text-yellow-400 font-semibold">👑 Your Hustle = Your Promotion. No Waiting. No Politics. Just Results.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Earning Scenarios */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Complete Earning Scenarios
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-4">Scenario A: BDE Starting Out</h4>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li>Month 1: $150,000 in sales → <span className="text-green-400 font-bold">$7,500</span></li>
                  <li>Month 2: $200,000 in sales (Top Performer) → <span className="text-green-400 font-bold">$10,000 + $2,000 = $12,000</span></li>
                </ul>
                <p className="text-white font-bold">Quarterly Total: <span className="text-green-400">$19,500</span></p>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-4">Scenario B: Established BDM with Team</h4>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li>Direct sales: $300,000 (10%) → <span className="text-green-400 font-bold">$30,000</span></li>
                  <li>3 BDEs each close $150,000 (5% bonus each) → <span className="text-green-400 font-bold">$22,500</span></li>
                  <li>Top Performer bonus (1% on direct) → <span className="text-green-400 font-bold">+$3,000</span></li>
                </ul>
                <p className="text-white font-bold">Monthly Total: <span className="text-green-400">$55,500</span></p>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-4">Scenario C: BDE Becoming BDM</h4>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li><strong>As BDE:</strong> 3 months, $750K total → <span className="text-green-400 font-bold">$45,000</span> + Promotion</li>
                  <li><strong>As New BDM:</strong> Now earning 10% on direct deals + team bonuses</li>
                </ul>
                <p className="text-white font-bold">Career Trajectory: <span className="text-green-400">2x earnings potential unlocked</span></p>
              </div>
            </div>
          </div>

          {/* Why Choose PrimAI */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Why PrimAI's Affiliate Plan Hits Different
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <span className="text-white">Crystal Clear Structure — No confusion. No hidden terms. Just transparent wins.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  <span className="text-white">Unlimited Growth Potential — Your ceiling = your ambition.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤝</span>
                  <span className="text-white">Team-Powered Income — BDMs profit when their BDEs succeed.</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <span className="text-white">Monthly Recognition — Top performers get spotlight + bonuses.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👑</span>
                  <span className="text-white">Merit-Based Promotion — 3-month winning streak = Leadership role.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <span className="text-white">No Corporate Politics — Results speak louder than tenure.</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">🌐</span>
                <span className="text-white text-lg">Future-Proof Industry — Web3, AI, Digital Transformation = The next decade.</span>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Quick Reference: Full Commission Summary
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-white bg-white/5 rounded-lg">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Direct Sale</th>
                    <th className="text-left p-4">Team Bonus</th>
                    <th className="text-left p-4">Top Performer</th>
                    <th className="text-left p-4">Promotion Path</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 font-semibold">BDE</td>
                    <td className="p-4 text-green-400">5% of invoice</td>
                    <td className="p-4">—</td>
                    <td className="p-4 text-green-400">1% monthly volume</td>
                    <td className="p-4 text-yellow-400">🔥 Win 3 consecutive months → Replace BDM</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">BDM</td>
                    <td className="p-4 text-green-400">10% of invoice</td>
                    <td className="p-4 text-green-400">5% per BDE sale</td>
                    <td className="p-4 text-green-400">1% monthly volume</td>
                    <td className="p-4 text-yellow-400">Leadership role with team</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Build the Future with PrimAI?
            </h3>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Let's grow together. Let's earn together. Let's build tomorrow, today.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <span className="text-2xl block mb-2">💼</span>
                <p className="text-white font-semibold">Apply as a BDE</p>
                <p className="text-gray-300 text-sm">Start closing, start earning</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <span className="text-2xl block mb-2">👔</span>
                <p className="text-white font-semibold">Apply as a BDM</p>
                <p className="text-gray-300 text-sm">Lead teams, multiply income</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <span className="text-2xl block mb-2">🏆</span>
                <p className="text-white font-semibold">Compete Monthly</p>
                <p className="text-gray-300 text-sm">Win bonuses, gain recognition</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <span className="text-2xl block mb-2">👑</span>
                <p className="text-white font-semibold">Earn Your Throne</p>
                <p className="text-gray-300 text-sm">3-month streak = BDM promotion</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
              >
                🚀 Join the Revolution
              </Link>
            </div>

            <p className="text-gray-300 mt-6">
              <strong className="text-white">PrimAI</strong> — <em>Where Web3 Meets Wealth Creation</em>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              🌍 Transforming Businesses. Empowering Affiliates. Shaping the Future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
