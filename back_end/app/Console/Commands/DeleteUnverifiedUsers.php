<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\UnverifiedUser;

class DeleteUnverifiedUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:unverified-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete unverified users older than a specific timeframe';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $timeframe = Carbon::now()->subSeconds(5);
        $deleted = UnverifiedUser::where('created_at', '<', $timeframe)->delete();
        dd("hi");
        $this->info("Deleted $deleted unverified users older than $timeframe.");

        //
    }
}
